
      (function() {
        const variations = ['a', 'b', 'c', 'd'];
        const variation = variations[new Date().getHours() % 4];
        const intendedUrl = "https://lond.com";
  
        if (
          window.location.origin + window.location.pathname === intendedUrl ||
          window.location.href.startsWith(intendedUrl + "?")
        ) {
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('variation') !== variation) {
            urlParams.set('variation', variation);
            const newUrl = window.location.pathname + '?' + urlParams.toString();
            window.history.replaceState(null, '', newUrl);
          }
        }
      })();