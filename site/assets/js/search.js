// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

(() => {
  'use strict'

  const searchElement = document.getElementById('docsearch')

  if (!window.docsearch || !searchElement) {
    return
  }

  const siteDocsVersion = searchElement.getAttribute('data-bd-docs-version')

  const search = window.docsearch({
    apiKey: '3151f502c7b9e9dafd5e6372b691a24e',
    indexName: 'bootstrap',
    appId: 'AK7KMZKZHQ',
    container: searchElement,
    searchParameters: {
      facetFilters: [`version:${siteDocsVersion}`]
    },
    transformItems(items) {
      return items.map(item => {
        const liveUrl = 'https://getbootstrap.com/'

        item.url = window.location.origin.startsWith(liveUrl) ?
          // On production, return the result as is
          item.url :
          // On development or Netlify, replace `item.url` with a trailing slash,
          // so that the result link is relative to the server root
          item.url.replace(liveUrl, '/')

        // Prevent jumping to first header
        if (item.anchor === 'content') {
          item.url = item.url.replace(/#content$/, '')
          item.anchor = null
        }

        return item
      })
    }
  })

  function hashSearch() {
    if (window.location.hash && window.location.hash.indexOf('#search=') === 0) {
      search.input.autocomplete.setVal(window.location.hash.slice(8))
      search.input.autocomplete.open()
    }
  }

  hashSearch()
  // For the nerds: search by changing the url hash
  window.addEventListener('hashchange', hashSearch, false)
})()
