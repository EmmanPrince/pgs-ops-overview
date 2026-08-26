exports.handler = async () => {
  console.log("SITE_ID exists:", !!process.env.SITE_ID);
  console.log("BLOBS TOKEN exists:", !!process.env.NETLIFY_BLOBS_TOKEN);

  return {
    statusCode: 200,
    body: JSON.stringify({
      siteIdExists: !!process.env.SITE_ID,
      blobsTokenExists: !!process.env.NETLIFY_BLOBS_TOKEN
    })
  };
};
