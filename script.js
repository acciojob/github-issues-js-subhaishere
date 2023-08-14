//your code here

let pageNumber = 1;
const perPage = 5;

const issuesList = document.getElementById('issues-list');
const loadPrevButton = document.getElementById('load_prev');
const loadNextButton = document.getElementById('load_next');
const pageHeading = document.getElementById('page-heading');

function fetchIssues(pageNumber) {
    const apiUrl = `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=${perPage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(issues => {
            issuesList.innerHTML = ''; // Clear the previous issues

            issues.forEach(issue => {
                const issueName = issue.title;
                const issueItem = document.createElement('li');
                issueItem.textContent = issueName;
                issuesList.appendChild(issueItem);
            });
        })
        .catch(error => console.log(error));
}

function updatePageHeading() {
    pageHeading.textContent = `Page number ${pageNumber}`;
}

loadPrevButton.addEventListener('click', () => {
    if (pageNumber > 1) {
        pageNumber--;
        fetchIssues(pageNumber);
        updatePageHeading();
    }
});

loadNextButton.addEventListener('click', () => {
    pageNumber++;
    fetchIssues(pageNumber);
    updatePageHeading();
});

// Initial page load
fetchIssues(pageNumber);
updatePageHeading();