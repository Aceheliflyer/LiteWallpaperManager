import settings from '../config/settings.json'
import wallpapers from '../config/wp-list.json'
import wget from 'wget-improved'
import crypto from 'crypto'

wallpapers.forEach(img => {
  var webFile: string = img.url.split('/').reverse()[0]
  var webFileName: string = webFile.split('.').reverse().splice(1).join('.')
  var webFileExt: string = webFile.split('.').reverse()[0]

  console.log(webFile)

  var nameHash = crypto
    .createHash('sha256')
    .update(webFileName)
    .digest('hex')
  wget.download(img.url, `${settings.general.downloadPath}/${nameHash}.${webFileExt}`)
})
