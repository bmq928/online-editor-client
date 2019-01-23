export const name = 'request'


service.$inject = ['$http', '$q']
export function service($http, $q) {
  const get = url => $q((resolve, reject) => {
    $http.get(url)
      .then(resp => resolve(resp.data.data))
      .catch(error => {
        if(error.data) reject(error.data.message)
        else if(error.message) reject(error.message)
        else if(error.statusText) reject(error.statusText)
        else reject('Error in connection')
      })
  })

  return {
    get
  }
}