

const timeDiv = document.getElementById('time')

const logButton = document.getElementById('log')

const saveButton = document.getElementById('save')

var timeoutID

var delayMS

function printTime() {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    var d = moment().format('MMMM Do YYYY, h:mm:ss a');
    var t = moment().format('h:mm:ss a');
    timeoutID = window.setTimeout(notify, delayMS, t);
    return d
    
}
function saveTime() {
  var hr = document.getElementById('hours').value * 3600000
  var min = document.getElementById('min').value * 60000
  delayMS = hr + min
}
logButton.addEventListener("click", evt => {timeDiv.innerHTML = printTime()})

saveButton.addEventListener("click", evt => {saveTime()})
// All below code is notifications code

const notificationBtn = document.getElementById('enable');

// Do an initial check to see what the notification permission state is

var canNotify = Notification.permission

let statusDiv = document.getElementById('status')
let requestButton = document.getElementById('request')

function notifStatus() {
    if (canNotify == "granted") {
        statusDiv.innerHTML = 'Notification permission has been <span style="color:green">granted</span>.'
        requestButton.style.display = 'block'
    } else if (canNotify == "denied") {
        statusDiv.innerHTML = 'Notification permission has been <span style="color:red">denied</span>.'
    } else {
        statusDiv.innerHTML = 'Notification permission has <span style="color:gray">not been requested</span>.'
    }
}

function askNotificationPermission() {
    // function to actually ask the permissions
    function handlePermission(permission) {
      // Whatever the user answers, we make sure Chrome stores the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
  
      // set the button to shown or hidden, depending on what the user answers
      if(Notification.permission === 'denied' || Notification.permission === 'default') {
        requestButton.style.display = 'block';
      } else {
        requestButton.style.display = 'none';
      }
    }
  
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log("This browser does not support notifications.");
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        })
      } else {
        Notification.requestPermission(function(permission) {
          handlePermission(permission);
        });
      }
    }
    notifStatus()
  }

notifStatus()

requestButton.addEventListener("click", evt => {askNotificationPermission()})

// Function to check whether browser supports the promise version of requestPermission()
  // Safari only supports the old callback-based version
  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }

  function notify(time) {
    console.log("notify() running!")
    let icon = 'https://img.icons8.com/color/512/000000/water-bottle.png'
    let body = "Your last drink was at " + time
    new Notification('Remember to drink', { body: body, image: icon, icon: icon})
  }

function test() {
  console.log("Test func run")
  notify("This is what notifications will look like")
}
let notifButton = document.getElementById('notifTest')
notifButton.addEventListener("click", evt => {test()})
