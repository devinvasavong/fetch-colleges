const express = require('express')
const app = express()
const PORT = 3000

async function getSearchResults(search) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("SingleItemSearchText", search);
    urlencoded.append("PageNumber", "1");
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    let data = await fetch("https://ope.ed.gov/dapip/api/search/simple", requestOptions)
    let json = await data.json()
    return json
}

app.get('/', async(req, res) => {
    let { search } = req.query
    if(!search) return res.status(400).send('No search query provided')
    let results = await getSearchResults(search)
    res.send(results)
})

app.listen(PORT, () => console.log(`🚀 @ ${PORT}`))