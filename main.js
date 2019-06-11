// attach event to the form by getting form id 
document.getElementById("issueForm").addEventListener('submit', saveIssues); 

function saveIssues(evt) {
    // prevent default
    evt.preventDefault(); 
    // getting random issue id from Chance.js
    var issueId = chance.guid(); 
    // get value from issue description 
    var issueDesc = document.querySelector("#issueDesc").value; 
    // get value from severity 
    var issueSeverity = document.querySelector("#selectInput").value; 
    // get value from assigned to 
    var assignedTo = document.querySelector("#assignedTo").value; 
    // set the status 
    var issueStatus = 'Open';
    
    // create an object 
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: assignedTo,
        status: issueStatus
    };

    // check the items in local storage 
    if (localStorage.getItem("issues") === null) {
        // create a new array 
        let issues = [];
        // store object to an array 
        issues.push(issue); 
        // store in local storage 
        localStorage.setItem('issues', JSON.stringify(issues)); 
    } else {
        // get issues from local storage 
        let issues = localStorage.getItem("issues"); 
        // parse the strings into object 
        let issuesObj = JSON.parse(issues); 
        issuesObj.push(issue); 
        localStorage.setItem("issues", JSON.stringify(issuesObj)); 
    }

    // display the message 
    document.getElementById("addMsg").style.display = 'inline-block';  
    // reset the values in the form 
    document.getElementById("issueForm").reset(); 

    // call function 
    fetchIssues(); 
}


// Method to fetch issue from local storage and it loads everytime the page is loading.
function fetchIssues() {
    // get items from local storage
    var issues = JSON.parse(localStorage.getItem('issues'));
   // console.log(issues);
    // get issue list id 
    var issuesList = document.getElementById("issuesList");
    // set to empty 
    issuesList.innerHTML = ''; 

    // check the length of issues 
    if (issues !== null) {
        issues.forEach(function (item) {
            let id = item.id; 
            let desc = item.description; 
            let severity = item.severity; 
            let assignedTo = item.assignedTo; 
            let status = item.status; 
            
            issuesList.innerHTML += "<div class='card'><div class='card-header'>Issue ID: " + id + 
                                    "<div class='float-right font-weight-bold text-danger'>" + severity + "</div></div>" +
                                    "<div class='card-body'><blockquote class='blockquote mb-0'>" + 
                                    "<p class='text-info'>Status: " + status + "</p>" + 
                                    "<p>" + desc + "</p></blockquote>" + 
                                    "<p class='text-muted font-italic'>Assigned To: " + assignedTo + "</p>" + 
                                    "<a class='btn btn-warning' onclick='setStatusClosed(\""+id+"\")'>Close</a> " +
                                    "<a class='btn btn-danger' onclick='deleteIssue(\""+id+"\")'>Delete</a>" +
                                    "</div>"
            
        })
    }
}

// set the status 
function setStatusClosed(id) {
    // get items from local storage 
    var items = localStorage.getItem("issues");
    // convert to object 
    var itemsObj = JSON.parse(items);
    // loop through
    for (let i = 0; i < itemsObj.length; i++) {
        if (itemsObj[i].id === id) {
            // set the status to 'closed'
            itemsObj[i].status = "Closed";
        }
    }

    // set items to local storage 
    localStorage.setItem('issues', JSON.stringify(itemsObj));

    // call function 
    fetchIssues(); 
}

function deleteIssue(id) {
    // get items from local storage 
    var items = localStorage.getItem("issues");
    // convert to object 
    var itemsObj = JSON.parse(items);
    // loop through
    for (let i = 0; i < itemsObj.length; i++) {
        if (itemsObj[i].id === id) {
            // remove the item
            itemsObj.splice(i, 1); 
        }
    }

    console.log(itemsObj);

    // set items to local storage 
    localStorage.setItem('issues', JSON.stringify(itemsObj));

    // call function 
    fetchIssues(); 
}