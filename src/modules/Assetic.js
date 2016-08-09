import layout from '../../config/layout'

const fixLocalAsset = assets => (
  (Array.isArray(assets) ? assets : [assets]).map(asset => `/${asset}`)
)

export const getAssets = (localAssets = []) => (
  Array.concat(
    layout.script.map(item => item.src),
    layout.link.map(item => item.href),
    localAssets.map(asset => fixLocalAsset(asset))
  )
)

export const getAssetsByExtension = (extension, localAssets = []) => {
  // Fixed issue about not picking up the elements, but nested arrays.
  let flattened = getAssets(localAssets).reduce((a, b) => a.concat(b), [])
  return flattened.filter(asset => new RegExp('.(' + extension + ')$').test(asset))
}

export const getScripts = (localAssets = []) => (
  getAssetsByExtension('js', localAssets)
)

export const getStyles = (localAssets = []) => (
  getAssetsByExtension('css', localAssets)
)
