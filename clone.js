var axios = require('axios');
var Git = require("nodegit");

var url = 'https://sheets.googleapis.com//v4/spreadsheets/1KURLYmYumKuXqKzuX4a9SmjyXIG0mqXaq1etMPZgLUs/values/A1:C39/?key=AIzaSyALmXCt2zEoU38_etO34Ctv2iZcoUZt8Rk';

axios.get(url)
    .then(function (response) {
        //console.log(response.data.values);
        var sheet_rows = response.data.values;
        sheet_rows.forEach(function(value){
            var id = value[0];
            var fullname = value[1];
            var repo = value[2];
            if (isNaN(id)) {
                return;
            }
            console.log(id, fullname, repo);
            if(repo != null){
                clone(repo, id);
            }
        });
    })
    .catch(function (error) {
        console.log(error);
    });  


function clone(repo, alias){
    var root = 'repos/';
    var dest = root + alias;
    Git.Clone(repo, dest).then(function(repository) {
        console.log('Cloing...' + repo + '...done');
      });
}