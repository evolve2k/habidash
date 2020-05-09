api.exportUserAvatarPng = {
  method: 'GET',
  url: '/export/avatar-:memberId.png',
  async handler (/* req, res */) {

    // req.checkParams('memberId', res.t('memberIdRequired')).notEmpty().isUUID();
    // const validationErrors = req.validationErrors();
    // if (validationErrors) throw validationErrors;

    const { memberId } = req.params;
    const filename = `avatars/${memberId}.png`;
    const s3url = `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`;

    let response;
    // try {
    //   response = await got.head(s3url); // TODO add timeout and retries
    // } catch (gotError) {
    //   // If the file does not exist AWS S3 can return a 403 error
    //   if (gotError.code !== 'ENOTFOUND' && gotError.statusCode
    //   !== 404 && gotError.statusCode !== 403) {
    //     throw gotError;
    //   }
    // }
    // cache images for 30 minutes on aws, else upload a new one
    // if (response && response.statusCode === 200 && moment()
    // .diff(response.headers['last-modified'], 'minutes') < 30) {
    //   return res.redirect(s3url);
    // }
    const pageBuffer = await new Pageres()
      .src(`${BASE_URL}/export/avatar-${memberId}.html`, ['140x147'], {
        crop: true,
        filename: filename.replace('.png', ''),
      })
      .run();
    const s3upload = S3.upload({
      Bucket: S3_BUCKET,
      Key: filename,
      ACL: 'public-read',
      StorageClass: 'REDUCED_REDUNDANCY',
      ContentType: 'image/png',
      Expires: moment().add({ minutes: 5 }).toDate(),
      Body: pageBuffer,
    });
    const s3res = await new Promise((resolve, reject) => {
      s3upload.send((err, s3uploadRes) => {
        if (err) {
          reject(err);
        } else {
          resolve(s3uploadRes);
        }
      });
    });
    return res.redirect(s3res.Location);
  },
};