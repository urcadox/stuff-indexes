{-# LANGUAGE OverloadedStrings #-}
module Main where

import Data.Functor ((<$>))
import Data.List (isPrefixOf)
import Data.Monoid (mappend, mconcat)
import Data.Text (pack, unpack, replace, empty)

import Hakyll

main :: IO ()
main = hakyll $ do

    -- Copy css
    match "css/*" $ do
        route idRoute
        compile compressCssCompiler

    -- Copy images
    match "images/*" $ do
        route   idRoute
        compile copyFileCompiler

    -- Copy gifs
    match "gifs/*" $ do
        route   idRoute
        compile copyFileCompiler

    -- Render images index
    create ["images.html"] $ do
        route idRoute
        compile $ do
            images <- loadAll "images/*"
            itemTpl <- loadBody "templates/item.html"
            list <- applyTemplateList itemTpl itemCtx images
            makeItem list
                >>= loadAndApplyTemplate "templates/list.html" allImagesCtx
                >>= relativizeUrls

    -- Render gifs index
    create ["gifs.html"] $ do
        route idRoute
        compile $ do
            gifs <- loadAll "gifs/*"
            itemTpl <- loadBody "templates/item.html"
            list <- applyTemplateList itemTpl itemCtx gifs
            makeItem list
                >>= loadAndApplyTemplate "templates/list.html" allGifsCtx
                >>= relativizeUrls

    -- Read templates
    match "templates/*" $ compile templateCompiler

itemCtx :: Context CopyFile
itemCtx = mconcat
    [ urlField "url" ]

allImagesCtx :: Context String
allImagesCtx =
    constField "title" "Images" `mappend`
    defaultContext

allGifsCtx :: Context String
allGifsCtx =
    constField "title" "Gifs" `mappend`
    defaultContext

externalizeUrls :: String -> Item String -> Compiler (Item String)
externalizeUrls root item = return $ fmap (externalizeUrlsWith root) item

externalizeUrlsWith :: String -- ^ Path to the site root
                    -> String -- ^ HTML to externalize
                    -> String -- ^ Resulting HTML
externalizeUrlsWith root = withUrls ext
  where
    ext x = if isExternal x then x else root ++ x

-- TODO: clean me
unExternalizeUrls :: String -> Item String -> Compiler (Item String)
unExternalizeUrls root item = return $ fmap (unExternalizeUrlsWith root) item

unExternalizeUrlsWith :: String -- ^ Path to the site root
                      -> String -- ^ HTML to unExternalize
                      -> String -- ^ Resulting HTML
unExternalizeUrlsWith root = withUrls unExt
  where
    unExt x = if root `isPrefixOf` x then unpack $ replace (pack root) empty (pack x) else x
