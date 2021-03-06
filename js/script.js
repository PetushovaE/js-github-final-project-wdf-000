class GithubInteractor {
	constructor(token) {
  		this.token = token;
	}
}

function createIssue(repoName, repoOwner, title, body) {
  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({
      'title': title,
      'body': body,
    }),
    headers: {Authorization: GithubInteractor.token}
  }).done(function(response) {
    return handleResponse(response);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    return handleError(jqXHR, textStatus, errorThrown);
  });
}

function handleResponse(response) {
  $('#issue').html(response.title)
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log('Post error: ' + errorThrown)
}

function submitForm() {
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
  });
}

// $(document).ready(function() {
//   submitForm()
// });


