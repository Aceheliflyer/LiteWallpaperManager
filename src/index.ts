import settings from '../config/settings.json'
import wallpapers from '../config/wp-list.json'
import wget from 'wget-improved'
import waifu2x from 'waifu2x'
import crypto from 'crypto'
import fs from 'fs-extra'
import path from 'path'

wallpapers.forEach(img => {
  var webFile: string = img.url.split('/').reverse()[0]
  var webFileName: string = webFile.split('.').reverse().splice(1).join('.')
  var webFileExt: string = webFile.split('.').reverse()[0]

  console.log(webFile)

  var nameHash = crypto
    .createHash('sha256')
    .update(webFileName)
    .digest('hex')

  fs.ensureDirSync(settings.general.downloadPath)
  var filePath = path.resolve(path.join(`${settings.general.downloadPath}/${nameHash}.${webFileExt}`))

  wget.download(img.url, filePath)
})

fs.ensureDirSync(settings.general.waifu2xPath)
waifu2x.upscaleImages(
  settings.general.downloadPath,
  settings.general.waifu2xPath,
  { noise: 2, scale: 2, recursion: 1, recursionFormat: 'png' }
)
