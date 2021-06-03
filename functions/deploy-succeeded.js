const { MeiliSearch } = require('meilisearch')

// Following functions decode context data and turns it into an object:
const extractNetlifySiteFromContext = function(context) {
  let site = {site_url: "http://localhost:8888"}
  if(typeof context.clientContext.custom !== "undefined") {
    site = JSON.parse(Buffer.from(context.clientContext.custom.netlify, "base64").toString("utf-8"))
  }
  return site
}

exports.handler = async function(event, context) {

  try {
    const client = new MeiliSearch({
      host: process.env.MEILI_HOST,
      apiKey: process.env.MEILI_PRIVATE_KEY,
    })
  
    const {site_url} = extractNetlifySiteFromContext(context)
    // An index is where the documents are stored.
    const envVars = ['MEILI_HOST', 'MEILI_PRIVATE_KEY', 'TND_SITE_ID']
    envVars.forEach(item => {
      if(!process.env[item]) {
        const error = `You need to set an environment variable for ${item}`
        console.error(error)
        throw error;
      }
    })
    
    const indexName = process.env.TND_SITE_ID
  
    const index = client.index(indexName)
  
    const documents = await fetch(`${site_url}/tnd_search_index.json`).then(response => {
      if(response.ok) {
        return response.json()
      }
    })
  
    // If the index 'movies' does not exist, MeiliSearch creates it when you first add the documents.
    let response = await index.addDocuments(documents)
    const body = {
      response,
      index: indexName,
      documents: documents.length
    }
    console.log(body)
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    };
  } catch(error) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          error
        })
      }
  }
}