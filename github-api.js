$(document).ready(function() {
   $('#inputUser').focus();
   function getUser(user){
      $.ajax({
         url: "https://api.github.com/users/" + user,
         dataType: "json",
         type: "get",
         data: {},
         success: function(data) {
            $("#git-results div div, #git-results div h1, #git-user").html('');
            $("#git-user").append('<img src="' + data.avatar_url + '" class="img-circle"><span class="name">' + user + '</span');
            if(data.public_repos){
               getRepos(user);
               $("#git-repos").append('<h3>Repos <span class="badge badge-inverse">' + data.public_repos + '</h3><ul>');
            }
            if(data.following){
               getFollowing(user);
               $("#git-following").append('<h3>Following <span class="badge badge-inverse">' + data.following + '</h3><ul>');
            }
            if(data.followers){
               getFollowers(user);
               $("#git-followers").append('<h3>Followers <span class="badge badge-inverse">' + data.followers + '</span></h3><ul>');
            }
            if(data.public_gists){
               getGists(user);
               $("#git-gists").append('<h3>Gists <span class="badge badge-inverse">' + data.public_gists + '</h3><ul>');
            }
         },
         error: function (jqXHR, textStatus, errorThrown)
         {
            console.log(errorThrown); 
         }
      });
   }
   function getRepos(user){
      $.ajax({
         url: "https://api.github.com/users/" + user + "/repos",
         dataType: "json",
         type: "get",
         data: {},
         success: function(data) {
            $.each(data, function(key,value){
               $("#git-repos").append('<li class="repo"><i class="icon-folder-open"></i><a href="' + data[key].html_url + '" target="_blank" class="repoName">' + data[key].name + '</a> <em>(' + data[key].language + ')</em> - <span class="label">Forks: ' + data[key].forks_count + '</span> <span class="label label-info">Watchers: ' + data[key].watchers_count + '</span></li>');
            });
            $("#git-repos").append('</ul>')
         },
         error: function (jqXHR, textStatus, errorThrown)
         {
         	console.log(errorThrown); 
         }
      });
   }
   function getGists(user){
      $.ajax({
         url: "https://api.github.com/users/" + user + "/gists",
         dataType: "json",
         type: "get",
         data: {},
         success: function(data) {
            $.each(data, function(key,value){
               files = [data[key].files];
               $("#git-gists").append('<li class="gist"><i class="icon-file"></i><a href="' + data[key].html_url + '" target="_blank" class="gistName">' + data[key].id + ' ' + ((data[key].description)?' - '+ data[key].description : '') + ' - <span class="label">Files: ' + files.length + '</span></li>');
            });
            $("#git-gists").append('</ul>')
         },
         error: function (jqXHR, textStatus, errorThrown)
         {
            console.log(errorThrown); 
         }
      });
   }
   function getFollowing(user){
      $.ajax({
         url: "https://api.github.com/users/" + user + "/following",
         dataType: "json",
         type: "get",
         data: {},
         success: function(data) {
            $.each(data, function(key,value){
               $("#git-following").append('<li class="following"><i class="icon-user"></i><a class="userName" href=#>' + data[key].login + '</a></li>');
            });
            $("#git-following").append('</ul>');
            $("#git-following .userName").click(function(e){
               getUser($(this).html());
               e.preventDefault();
            });
         },
         error: function (jqXHR, textStatus, errorThrown)
         {
            console.log(errorThrown); 
         }
      });
   }
   function getFollowers(user){
      $.ajax({
         url: "https://api.github.com/users/" + user + "/followers",
         dataType: "json",
         type: "get",
         data: {},
         success: function(data) {
            $.each(data, function(key,value){
               $("#git-followers").append('<li class="follower"><i class="icon-user"></i><a class="userName" href=#>' + data[key].login + '</a></li>');
            });
            $("#git-followers").append('</ul>');
            $("#git-followers .userName").click(function(e){
               getUser($(this).html());
               e.preventDefault();
            });
         },
         error: function (jqXHR, textStatus, errorThrown)
         {
            console.log(errorThrown); 
         }
      });
   }

   $('#inputSubmit').click(function(e){
      getUser($('#inputUser').val());
      e.preventDefault();
   });



});




