{-# LANGUAGE OverloadedStrings #-}
module Main where

import Data.Functor ((<$>))
import Data.Monoid (mappend, mconcat)

import Hakyll

main :: IO ()
main = hakyll $ do

    -- Copy css
    match "css/*" $ do
        route idRoute
        compile compressCssCompiler

    -- Copy js
    match "js/*" $ do
        route idRoute
        compile copyFileCompiler

    -- Copy images
    match ("images/*.jpg" .||. "images/*.png") $ do
        route   idRoute
        compile copyFileCompiler

    -- Copy gifs
    match "gifs/*.gif" $ do
        route   idRoute
        compile copyFileCompiler

    -- Render images index
    create ["images/index.html"] $ do
        route idRoute
        compile $ do
            images <- loadAll ("images/*.jpg" .||. "images/*.png")
            itemTpl <- loadBody "templates/item.html"
            list <- applyTemplateList itemTpl itemCtx images
            makeItem list
                >>= loadAndApplyTemplate "templates/list.html" allImagesCtx

    -- Render gifs index
    create ["gifs/index.html"] $ do
        route idRoute
        compile $ do
            gifs <- loadAll "gifs/*.gif"
            itemTpl <- loadBody "templates/item.html"
            list <- applyTemplateList itemTpl itemCtx gifs
            makeItem list
                >>= loadAndApplyTemplate "templates/list.html" allGifsCtx

    -- Read templates
    match "templates/*" $ compile templateCompiler

itemCtx :: Context CopyFile
itemCtx = mconcat
    [ urlField "url" ]

allImagesCtx :: Context String
allImagesCtx =
    constField "title" "Images" `mappend`
    constField "itemsperpage" "10" `mappend`
    defaultContext

allGifsCtx :: Context String
allGifsCtx =
    constField "title" "Gifs" `mappend`
    constField "itemsperpage" "5" `mappend`
    defaultContext
