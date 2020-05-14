import axios from 'axios/index'

const get_data = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`http://kinetika-1c.tmweb.ru/http/hs/agent/${url}/post`,
      JSON.stringify(data),
      {
        headers: { 'Content-Type': 'text/plain' }
      }

    ).then((result) => {
      // console.log(result)
      if (result.data.status === 'error') {
        reject(result.data.data)
      } else if (result.data.status === 'ok') {
        resolve(result.data.data)
      } else { reject(result.data) }
    }).catch((error) => {
      console.log(error)
      reject(error.response)
    })
  })
}

const dateToString = (date) => {
  let day = date.getDate()
  if (day < 10) { day = '0' + day }
  let mm = date.getMonth() + 1
  if (mm < 10) { mm = '0' + mm };
  return (`${day}-${mm}-${date.getFullYear()}`)
}

const saveAs = (blob, fileName) => {
  var url = window.URL.createObjectURL(blob);

  var anchorElem = document.createElement("a");
  anchorElem.style = "display: none";
  anchorElem.href = url;
  anchorElem.download = fileName;

  document.body.appendChild(anchorElem);
  anchorElem.click();

  document.body.removeChild(anchorElem);

  // On Edge, revokeObjectURL should be called only after
  // a.click() has completed, atleast on EdgeHTML 15.15048
  setTimeout(function() {
      window.URL.revokeObjectURL(url);
  }, 1000);
}

const get_file = (userkey,file_type,file_num,filename) => {
  
  const data = {
    userkey: userkey,
    filetype: file_type,
    filenum: file_num
  }
  get_data('getfile',data).then(
    (result) => {
      
      var byteCharacters = atob(result)
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      
      // now that we have the byte array, construct the blob from it
      var blob1 = new Blob([byteArray], {type: "application/octet-stream"});
  
      var fileName1 = filename;
      saveAs(blob1, fileName1);
    },
    (err) => { 
        console.log("err")  
        console.log(err) 
    }
);
}

export { get_data, dateToString, get_file }
