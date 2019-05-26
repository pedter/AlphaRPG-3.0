// Save and load functions
var canSave = 1;

function save() {
  if (canSave == 1) {
    localStorage.setItem("Matrix2", JSON.stringify(Game));
    localStorage.setItem("Matrix2-Backup", JSON.stringify(Game.username));
  }
}

function BackupData() {
  localStorage.setItem("Matrix2-Backup", JSON.stringify(Game.username));
}

function loadBackup() {
  var Backup = JSON.parse(localStorage.getItem("Matrix2-Backup"));
  Game.username = Backup;
  UpdateGame();
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("Matrix2"));

  for (var property in savegame) {
    if (typeof savegame[property] !== "undefined")
      Game[property] = savegame[property];
  }
}

function exportSave() {
  window.getSelection().removeAllRanges();
  showmessage("Save exported", "Your save is now copied in your clipboard.");
  $("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(Game)) + "</textarea>");
  var textField = document.getElementById("saveCode");
  textField.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  $("#exportBody").html("");
}

function exportTheme() {
  window.getSelection().removeAllRanges();
  showmessage("Theme exported", "This theme is now copied in your clipboard.");
  $("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(Game.Theme)) + "</textarea>");
  var textField = document.getElementById("saveCode");
  textField.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  $("#exportBody").html("");
}

function importTheme() {
  var save = prompt("Paste your theme code here");
  if (save) {
    try {
      var decoded = atob(save);
      if (decoded) {
        Game.Theme = JSON.parse([decoded]);
        UpdateUI();
      } else {
        $("#codereturn").html("ERROR: Invalid Theme");
      }
    } catch (err) {
      $("#codereturn").html("ERROR: Invalid Theme");
    }
  }
}

function importSave() {
  var save = prompt("Paste your save code here");
  if (save) {
    restoreSave(save);
  }
}

function restoreSave(save) {
  try {
    var decoded = atob(save);
    JSON.parse(decoded);
    if (decoded) {
      localStorage.setItem("Matrix2", decoded);
      canSave = 0;
      location.reload();
    } else {
      $("#codereturn").html("ERROR: Invalid Save Data");
    }
  } catch (err) {
    $("#codereturn").html("ERROR: Invalid Save Data");
  }
}

function Reset() {
  $("#modal-6").modal("show");
}

function confirmReset() {
  canSave = 0;
  localStorage.clear();
  BackupData();
  location.reload();
}

//MISC FUNCTIONS

function fix(x, type) {
  if (type == 0) return numeral(x).format("0ib");
  if (type == 1)
    if (x == 0.5) {
      return "0.5B";
    } else return numeral(x).format("0.0ib");
  if (type == 2) return numeral(x).format("0.00ib");
  if (type == 3) return numeral(x).format("0,0");
  if (type == 4) return numeral(x).format("0");
  if (type == 5) {
    if (x < 1000) return numeral(x).format("0a");
    else
      return numeral(x).format("0.0a");
  }
  if (type == 6) return numeral(x).format("0.00a");
  if (type == 7) return numeral(x).format("0.0a");
  if (type == 8) return numeral(x).format("0.00%");
  if (type == 9) return numeral(x).format("0%");
  if (type == 10) return numeral(x).format("0.0%");
}

function getDate() {
  var today = new Date();
  var date = today.toLocaleDateString();
  var time = today.toLocaleTimeString();
  CurrentDate = date + " at " + time;
  return CurrentDate;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHHMMSS(id) {
  var sec_num = parseInt(id, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  var secondstext = 0;
  var minutestext = 0;
  var hourstext = 0;
  if (hours > 0) {
    hourstext = hours + " hours ";
  } else {
    hourstext = "";
  }
  if (minutes > 0) {
    minutestext = minutes + " minutes ";
  } else {
    minutestext = "";
  }
  if (seconds > 0) {
    secondstext = seconds + " seconds ";
  } else {
    if (minutes > 0) {
      secondstext = "";
    } else {
      secondstext = "0 seconds";
    }
  }
  if (hours == 1) {
    hourstext = hours + " hour ";
  }
  if (minutes == 1) {
    minutestext = minutes + " minute ";
  }
  if (seconds == 1) {
    secondstext = seconds + " second ";
  }
  var time = hourstext + minutestext + secondstext;
  return time;
}

//MATRIX BACKGROUND

var font_size = 20;
document.getElementById("q").height = window.innerHeight;
document.getElementById("q").width = window.innerWidth;
var drops = [];
for (var x = 0; x < $("#q").get(0).width / font_size; x++)
  drops[x] = 1;

function draw() {
  var c = $("#q").get(0);
  var ctx = $("#q").get(0).getContext("2d");
  ctx.fillStyle = $("*").css("--black2");
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = $("*").css("--green2");
  ctx.font = font_size + "px Ubuntu";
  for (var i = 0; i < drops.length; i++) {
    var TRX = ['▢'];
    var text = TRX[Math.floor(Math.random() * TRX.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);
    if (drops[i] * font_size > c.height && Math.random() > 0.95) drops[i] = 0;
    drops[i]++;
  }
}

function UpdateCanvas() {
  var c = $("#q").get(0);
  var ctx = $("#q").get(0).getContext("2d");
  document.getElementById("q").height = window.innerHeight;
  document.getElementById("q").width = window.innerWidth;
  ctx.fillStyle = $("*").css("--black1");
  ctx.fillRect(0, 0, c.width, c.height);
  for (var x = 0; x < $("#q").get(0).width / font_size; x++) drops[x] = 1;
  if (window.innerWidth < 1000) {
    $("#evomobile").show();
    $("#evomobile2").show();
    $("#container").removeClass("grid");
    $("#EvolutionsTables").removeClass("overflowTable");
  } else {
    $("#evomobile").hide();
    $("#evomobile2").hide();
    $("#container").addClass("grid");
    $("#EvolutionsTables").addClass("overflowTable");
  }
}

var config = {
  apiKey: "AIzaSyAsKlY89gHACvQHywLv04xtxPBvhRGoNYo",
  authDomain: "matrix-731a7.firebaseapp.com",
  databaseURL: "https://matrix-731a7.firebaseio.com",
  projectId: "matrix-731a7",
  storageBucket: "",
  messagingSenderId: "752237806136"
};
firebase.initializeApp(config);

var PAGE = 1;
var MAXVIEW = 10;
var MINVIEW = 1;
var LastId = 0;
var LeaderFilter = 0;

function filter(f) {
  LeaderFilter = f;
  UpdateGame();
  TOP10();
}

function ResetLeaderBoard() {
  $("#LEADERBOARD").html("<thead><tr class='shadow'><th class='ui center aligned'></th><th class='ui center aligned'>Name</th><th class='ui center aligned'><a onclick='filter(1);'>Ranking</a></th><th class='ui center aligned'><a onclick='filter(0);'>Simulation</a></th><th class='ui center aligned'>Power</th><th class='ui center aligned'>Life</th><th class='ui center aligned'>Ratio (K/D)</th>");
}

function writeUserData(userId) {
  if (location.href.match(/(goldenlys.github.io).*/) && userId == Game.username && Game.Level > 1 && userId != "Default") {
    firebase.database().ref('users/' + userId).set({
      Order: (-1 * Game.Ranking) - (100000 * Game.Simulation),
      Order2: -1 * Game.Ranking,
      Level: Game.Level,
      Ranking: Game.Ranking,
      WT: Game.Simulation,
      CorePower: Game.CorePower,
      CoreLife: Game.CoreBaseLife,
      Kills: Game.Wins,
      Deaths: Game.Loses,
      Avatar: Game.Avatar,
      Defeated: Game.Defeated,
      Version: version,
      Theme: Game.Theme[0],
    });
  }
}

function NewUserData(old) {
  if (location.href.match(/(goldenlys.github.io).*/) && old != "Default" && old == Game.username) {
    firebase.database().ref('users/' + old).set(null);
    Game.username = "Default";
    Backup = "Default";
    save();
    $("#CATEGORIE-1").hide();
    $("#CATEGORIE-2").hide();
    $("#CATEGORIE-3").hide();
    $("#CATEGORIE-4").hide();
    $("#begin").show();
  }
}

function ReadDB() {
  var ref = firebase.database().ref("users");
  var CXD = firebase.database().ref("codes");
  CXD.on("child_added", function () {});
  Game.Leader = 0;
  id = 0;
  ResetLeaderBoard();
  if (LeaderFilter == 0) {
    ref.orderByChild("Order").limitToLast(100000).on("child_added", function (snapshot) {
      UpdateDB(snapshot);
    });
  } else {
    ref.orderByChild("Order2").limitToLast(100000).on("child_added", function (snapshot) {
      if (snapshot.val().Version > 1.15) {
        UpdateDB(snapshot);
      }
    });
  }
}

function UpdateDB(snapshot) {
  id++;
  if (snapshot.key === Game.username + " " || snapshot.key === Game.username) {
    Game.Leader = id;
  }
  if (id >= MINVIEW && id <= MAXVIEW) {
    if (snapshot.val().Version > 1.09) {
      if (snapshot.val().Avatar == undefined) {
        Avatar = 1;
      } else {
        Avatar = snapshot.val().Avatar;
      }
      if (snapshot.val().Theme == undefined) {
        Theme = $("*").css("--white");
      } else {
        Theme = snapshot.val().Theme;
      }
      $("#LEADERBOARD").append("<tr id='leader-" + id + "' class=''>" +
        "<td class='center aligned'>#" + id + "</td>" +
        "<td class='center aligned' style='color:" + Theme + ";'><img class='ui mini avatar image' src='DATA/avatars/avatar" + Avatar + ".jpg'>" + snapshot.key + "</td>" +
        "<td class='center aligned'><i class='small gem icon'></i>" + fix(snapshot.val().Ranking, 4) + " (" + fix(snapshot.val().Level, 4) + ") " + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().WT, 3) + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().CorePower, 5) + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().CoreLife, 5) + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().Kills / snapshot.val().Deaths, 7) + "</td>" +
        "</tr>");
    } else {
      id--;
    }
  }
  LastId = id;
  if (Game.Leader == 0) {
    Game.Leader = "Unranked";
  }
}

//UI FUNCTIONS

function hideMenuTabs() {
  for (var id = 0; id < 10; id++) {
    $("#CATEGORIE-" + id).hide();
    $("#C" + id).removeClass("active");
    $("#C" + id).addClass("");
  }
}

function ClickEvents() {
  $("#menu").on("click", "div", function () {
    var id = $(this).data("id");
    hideMenuTabs();
    $("#CATEGORIE-" + id).show();
    $("#C" + id).addClass("active");
    $("#C" + id).removeClass("");
    TOP10();
  });
  $("#themeBTN1").on("click", function () {
    ThemeDefine(1);
  });
  $("#themeBTN2").on("click", function () {
    ThemeDefine(2);
  });
  $("#themeBTN3").on("click", function () {
    ThemeDefine(3);
  });
  $("#themeBTN4").on("click", function () {
    ThemeDefine(4);
  });
  $("#themeBTN5").on("click", function () {
    ThemeDefine(5);
  });
  $("#themeBTNR").on("click", function () {
    ResetTheme(1);
  });
  $("#attack-btn").on("click", function () {
    Attack();
  });
  $("#emp-btn").on("click", function () {
    LaunchEMP();
  });
  $("#cover-btn").on("click", function () {
    Protect();
  });
  $("#run-btn").on("click", function () {
    RunAway();
  });
  $("#UpdateName").on("click", function () {
    UpdateName();
  });
  $("#closeMSG").on("click", function () {
    hideModals();
  });
  $("#WTBTN").on("click", function () {
    ChangeWT();
  });
  $("#CheckCode").on("click", function () {
    CheckCode();
  });
  $("#TOP10").on("click", function () {
    TOP10();
  });
  $("#TOPNEXT").on("click", function () {
    TOPNEXT();
  });
  $("#TOPPREVIOUS").on("click", function () {
    TOPPREVIOUS();
  });
  $("#ChangeAvatar").on("click", function () {
    ChangeAvatar();
  });
  $("#ChangeAvatarBegin").on("click", function () {
    ChangeAvatar();
  });
  $("#xpm-btn").on("click", function () {
    BuyXPMult();
  });
  $("#pm-btn").on("click", function () {
    BuyPowerMult();
  });
  $("#lpm-btn").on("click", function () {
    BuyLifeMult();
  });
  $("#reset-btn").on("click", function () {
    Reset();
  });
  $("#Reload").on("click", function () {
    location.reload();
  });
  $("#Dcore1").on("click", function () {
    ConfirmDestroy(1);
  });
  $("#Dcore2").on("click", function () {
    ConfirmDestroy(2);
  });
  $("#Dcore3").on("click", function () {
    ConfirmDestroy(3);
  });
  $("#Dcore4").on("click", function () {
    ConfirmDestroy(4);
  });
  $("#export-btn").on("click", function () {
    exportSave();
  });
  $("#import-btn").on("click", function () {
    importSave();
  });
  $("#exportt-btn").on("click", function () {
    exportTheme();
  });
  $("#importt-btn").on("click", function () {
    importTheme();
  });
  $("#gotomenu-btn").on("click", function () {
    GotoMenu();
  });
  $("#prestige-btn").on("click", function () {
    ShowScoreMenu();
  });
  $("#missions-btn").on("click", function () {
    ShowMissionsMenu();
  });
  $("#exploration-btn").on("click", function () {
    ShowExplorationMenu();
  });
  $("#inventory-btn").on("click", function () {
    ShowInventoryMenu();
  });
  $("#stats-btn").on("click", function () {
    ShowStatsMenu();
  });
  $("#leaderboard-btn").on("click", function () {
    ShowLeaderboard();
  });
  $("#settings-btn").on("click", function () {
    ShowSettings();
  });
  $("#discord-btn").on("click", function () {
    window.open('https://discordapp.com/invite/SBuYeHh', '_blank');
  });
  $("#AlertToggle").on("click", function () {
    if (Game.confirmations == 0) {
      Game.confirmations = 1;
    } else {
      Game.confirmations = 0;
    }
    UpdateGame();
  });
  $("#AlertToggle2").on("click", function () {
    if (Game.conf2 == 0) {
      Game.conf2 = 1;
    } else {
      Game.conf2 = 0;
    }
    UpdateGame();
  });
  $("#SkipRewards").on("click", function () {
    if (Game.conf3 == 0) {
      Game.conf3 = 1;
    } else {
      Game.conf3 = 0;
    }
    UpdateGame();
  });
  $("#AutoMissions").on("click", function () {
    if (Game.conf4 == 0) {
      Game.conf4 = 1;
    } else {
      Game.conf4 = 0;
    }
    UpdateGame();
  });
  $("#RM1").on("click", function () {
    if (Game.ATR[0] == 0) {
      Game.ATR[0] = 1;
    } else {
      Game.ATR[0] = 0;
    }
    UpdateUI();
  });
  $("#RM2").on("click", function () {
    if (Game.ATR[1] == 0) {
      Game.ATR[1] = 1;
    } else {
      Game.ATR[1] = 0;
    }
    UpdateUI();
  });
  $("#RM3").on("click", function () {
    if (Game.ATR[2] == 0) {
      Game.ATR[2] = 1;
    } else {
      Game.ATR[2] = 0;
    }
    UpdateUI();
  });
  $("#RM4").on("click", function () {
    if (Game.ATR[3] == 0) {
      Game.ATR[3] = 1;
    } else {
      Game.ATR[3] = 0;
    }
    UpdateUI();
  });
  $("#RM5").on("click", function () {
    if (Game.ATR[4] == 0) {
      Game.ATR[4] = 1;
    } else {
      Game.ATR[4] = 0;
    }
    UpdateUI();
  });
  $("#RM6").on("click", function () {
    if (Game.ATR[5] == 0) {
      Game.ATR[5] = 1;
    } else {
      Game.ATR[5] = 0;
    }
    UpdateUI();
  });
  $("#redNum").change(function () {
    if ($("#redNum").val() < 0) {
      $("#redNum").val("0");
    }
    $("#red").val($("#redNum").val());
    document.documentElement.style.setProperty('--temp1', "rgb(" + $("#redNum").val() + ", 0, 0)");
  });
  $("#red").change(function () {
    $("#redNum").val($("#red").val());
    document.documentElement.style.setProperty('--temp1', "rgb(" + $("#red").val() + ", 0, 0)");
  });
  $("#greenNum").change(function () {
    if ($("#greenNum").val() < 0) {
      $("#greenNum").val("0");
    }
    $("#green").val($("#greenNum").val());
    document.documentElement.style.setProperty('--temp2', "rgb(0, " + $("#greenNum").val() + ", 0)");

  });
  $("#green").change(function () {
    $("#greenNum").val($("#green").val());
    document.documentElement.style.setProperty('--temp2', "rgb(0, " + $("#green").val() + ", 0)");
  });
  $("#blueNum").change(function () {
    if ($("blueNum").val() < 0) {
      $("#blueNum").val("0");
    }
    $("#blue").val($("#blueNum").val());
    document.documentElement.style.setProperty('--temp3', "rgb(0, 0, " + $("#blueNum").val() + ")");
  });
  $("#blue").change(function () {
    $("#blueNum").val($("#blue").val());
    document.documentElement.style.setProperty('--temp3', "rgb(0, 0, " + $("#blue").val() + ")");
  });
  Shortcuts();
}

function Shortcuts() {
  document.onkeyup = function (e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    if (Game.isInFight == 1) { //IN FIGHT
      if (key === 69) {
        if (Game.Emp > 0) {
          LaunchEMP();
        }
      }
      if (key === 82) {
        Protect();
      }
      if (key === 32) {
        Attack();
      }
      if (key === 70) {
        RunAway();
      }
    }
    if (Game.isInFight == 2) { //FIGHT ENDED
      if (key === 70) {
        hideRewards();
      }
    }
    if (Game.isInFight == 5) { //CORE LOOTED
      if (key === 97 || key === 49) {
        if (Game.cores[1] == true) {
          NewCore(1);
        }
      }
      if (key === 98 || key === 50) {
        if (Game.cores[2] == true) {
          NewCore(2);
        }
      }
      if (key === 99 || key === 51) {
        if (Game.cores[3] == true) {
          NewCore(3);
        }
      }
      if (key === 100 || key === 52) {
        if (Game.cores[4] == true) {
          NewCore(4);
        }
      }
      if (key === 78) {
        Cancelconfirm();
      }
      if (key === 70) {
        hideRewards();
      }
    }
    if (Game.isInFight == 4) { //KEY LOOTED
      if (key === 97 || key === 49) {
        if (Game.cores[1] == true) {
          UPCore(1, item.object);
        }
      }
      if (key === 98 || key === 50) {
        if (Game.cores[2] == true) {
          UPCore(2, item.object);
        }
      }
      if (key === 99 || key === 51) {
        if (Game.cores[3] == true) {
          UPCore(3, item.object);
        }
      }
      if (key === 100 || key === 52) {
        if (Game.cores[4] == true) {
          UPCore(4, item.object);
        }
      }
      if (key === 70) {
        hideRewards();
      }
    }
    if (Game.isInFight == 3) { //BEGIN & SELECT USERNAME
      if (key === 13) {
        UpdateName();
      }
    }
    if (Game.isInFight == 6) { //NEW CORE CONFIRMATION
      if (key === 89) {
        if (Game.NCore == 1) {
          DefineCore(1);
        }
        if (Game.NCore == 2) {
          DefineCore(2);
        }
        if (Game.NCore == 3) {
          DefineCore(3);
        }
        if (Game.NCore == 4) {
          DefineCore(4);
        }
      }
      if (key === 78) {
        Cancelconfirm();
      }
    }
    if (Game.isInFight == 7) { //OS LOOTED
      if (key === 70) {
        hideRewards();
      }
    }
    if (Game.isInFight == 8) { //NEW OS CONFIRMATATION
      if (key === 89) {
        ConfirmOS();
      }
      if (key === 78) {
        Cancelconfirm();
      }
    }
    if (Game.isInFight == 9) { //GAME MENU
      if (key === 97 || key === 49) {
        ShowMissionsMenu();
      }
      if (key === 98 || key === 50) {
        ShowExplorationMenu();
      }
      if (key === 99 || key === 51) {
        ShowInventoryMenu();
      }
      if (key === 100 || key === 52) {
        ShowScoreMenu();
      }
      if (key === 101 || key === 53) {
        ShowStatsMenu();
      }

      if (key === 102 || key === 54) {
        ShowLeaderboard();
      }

      if (key === 103 || key === 55) {
        ShowSettings();
      }
    }
  };
}

$(document).keydown(function (e) {
  if (e.keyCode == 27) {
    GotoMenu();
  }
});

function hideModals() {
  for (var id = 1; id < 10; id++) {
    ReadDB();
    $("#modal-" + id).modal("hide");
    $("#PirateAttackDesc").html("");
  }
}

function showmessage(title, message) {
  $("#message-title").html(title);
  $("#message-text").html(message);
  $("#modal-1").modal("setting", "closable", false).modal("show");
}

function GetEnnemyHPPercent() {
  value = (100 / Game.Ennemy[4]) * Game.Ennemy[5];
  if (value < 1) {
    value = 1;
  }
  if (value > 100) {
    value = 100;
  }
  return value;
}

function GetPlayerHPPercent() {
  value = (100 / Game.CoreBaseLife) * Game.CoreLife;
  if (value < 1) {
    value = 1;
  }
  if (value > 100) {
    value = 100;
  }
  return value;
}

function GetEXPPercent() {
  value = (100 / Game.xp[1]) * Game.xp[0];
  if (value < 1) {
    value = 1;
  }
  if (value > 100) {
    value = 100;
  }
  return value;
}

//THEME FUNCTIONS

function ResetTheme(code) {
  if (code != 0) {
    Game.Theme = ["#00ff0d", "#0d0d0d73", "#005204", "#FFFFFF", "#26262680", "#262626", "#0d0d0d"];
  }
  document.documentElement.style.setProperty('--green', Game.Theme[0]);
  document.documentElement.style.setProperty('--black2', Game.Theme[1]);
  document.documentElement.style.setProperty('--green2', Game.Theme[2]);
  document.documentElement.style.setProperty('--white', Game.Theme[3]);
  document.documentElement.style.setProperty('--darkgrey5', Game.Theme[4]);
  document.documentElement.style.setProperty('--darkgrey', Game.Theme[5]);
  document.documentElement.style.setProperty('--black', Game.Theme[6]);
  if (code != 1) {
    save();
  }
}

function ThemeDefine(id) {
  if (id == 1) {
    Game.Theme[0] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--green', Game.Theme[0]);
  }
  if (id == 2) {
    Game.Theme[1] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val()) + "73";
    Game.Theme[6] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--black2', Game.Theme[1]);
    document.documentElement.style.setProperty('--black', Game.Theme[6]);
  }
  if (id == 3) {
    Game.Theme[2] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--green2', Game.Theme[2]);
  }
  if (id == 4) {
    Game.Theme[3] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--white', Game.Theme[3]);
  }
  if (id == 5) {
    Game.Theme[4] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val()) + "80";
    Game.Theme[5] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--darkgrey5', Game.Theme[4]);
    document.documentElement.style.setProperty('--darkgrey', Game.Theme[5]);
  }
  UpdateGame();
}

//GAME FUNCTIONS

function ChangeAvatar() {
  if (Game.Avatar < 33) {
    Game.Avatar++;
  } else {
    Game.Avatar = 1;
  }
  UpdateGame();
}

function CheckCode(debug) {
  CXD = firebase.database().ref("codes");
  CXD.on("child_added", function (code) {
    codes[code.key] = code.val();
  });
  var code = $("#promocode").val();
  if (code != null) {
    if (code === codes[1] || code === codes[2] || code === codes[3] || code === codes[4] || code === codes[5] || code === codes[6] || code === codes[7] || code === codes[8] || code === codes[9]) {
      if (code === codes[1]) {
        $("#codereturn").html("Code Accepted, name change.");
        NewUserData(Game.username);
      }
      if (code === codes[2]) {
        $("#codereturn").html("Code Accepted, raising all core slots by 1.");
        for (var UPC = 0; UPC < 4; UPC++) {
          Game.MaxUPC[UPC]++;
        }
      }
      if (code === codes[3]) {
        $("#codereturn").html("Code Accepted, you are now at max level.");
        Game.Level = Game.MaxLevel;
      }
      if (code === codes[4]) {
        $("#codereturn").html("Code Accepted, you just advanced to </i> <i class='globe icon'></i>" + (Game.Simulation + 1));
        Game.Level = Game.MaxLevel;
        Game.core1[4] = Game.MaxScore;
        Game.core2[4] = Game.MaxScore;
        Game.core3[4] = Game.MaxScore;
        Game.core4[4] = Game.MaxScore;
        ChangeWT();
      }
      if (code === codes[5]) {
        if (Game.Simulation > 1) {
          $("#codereturn").html("Code Accepted, you just lowered to <i class='globe icon'></i> " + (Game.Simulation - 1));
          Game.Simulation--;
        } else {
          invalidCode(3);
        }
      }
      if (code === codes[6]) {
        $("#codereturn").html("Code Accepted, save exported to your clipboard.");
        exportSave();
      }
      if (code === codes[7]) {
        $("#codereturn").html("Code Accepted, external save imported to your current save.");
        importSave();
      }
      if (code === codes[8]) {
        $("#codereturn").html("Code Accepted, cloud save done.");
        writeUserData(Game.username);
        Game.lastCloudSave = 0;
      }
      if (code === codes[9]) {
        $("#codereturn").html("Code Accepted, your god killed stats has been set to '1'.");
        Game.Defeated[7] = 1;
      }
    } else {
      if (debug != 1) {
        CheckCode(1);
      }
      invalidCode(1);
    }
  } else {
    invalidCode(2);
  }
  codes = [];
  UpdateGame();
}

function invalidCode(error) {
  $("#codereturn").html("Invalid code ! (error " + error + ")");
}

function TOP10() {
  MAXVIEW = 10;
  MINVIEW = 1;
  PAGE = 1;
  UpdateUI();
  ReadDB();
}

function TOPPREVIOUS() {
  if (MAXVIEW > 10) {
    MAXVIEW -= 10;
    MINVIEW -= 10;
    PAGE--;
    UpdateUI();
    ReadDB();
  }
}

function TOPNEXT() {
  if (MAXVIEW + 1 <= LastId) {
    if (MAXVIEW < 10000) {
      MAXVIEW += 10;
      MINVIEW += 10;
      PAGE++;
      UpdateUI();
      ReadDB();
    }
  } else {
    UpdateUI();
  }
}

function helpScore() {
  showmessage("Score Tutorial", "1) It's worked out from the cores you have, so try to pick the cores that gets you the highest score possible. That way you'll progress through the Simulations much faster, even if you take a slight hit on your stats. <br><br>2) Your cores dictates the score for the loot that drops.<br><br>3) Your score is limited by your actual Simulation and the maximum score can be seen in the statistics.");
}

function GotoMenu() {
  var MTEXT = "";
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  UpdateUI();
  if (Game.isInFight == 1) {
    $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Menu" + MTEXT);
    if ($('#rewards').is(":visible")) {
      REWARDSW8 = 1;
      $("#rewards").hide();
    }
    Game.isInFight = 9;
    hideMenus();
    $("#gamemenu").show();
  } else {
    if (Game.isInFight == 9) {
      Game.isInFight = 1;
      hideMenus();
      if (REWARDSW8 == 1) {
        Game.isInFight = 2;
        $("#rewards").show();
        REWARDSW8 = 0;
      } else {
        $("#combat").show();
      }
      $("#cores").show();
      UpdateUI();
    } else {
      $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Menu" + MTEXT);
      if ($('#rewards').is(":visible")) {
        REWARDSW8 = 1;
        $("#rewards").hide();
      }
      Game.isInFight = 9;
      hideMenus();
      $("#gamemenu").show();
    }
  }
}

function DCancel() {
  $('#modal-2').modal('hide');
}

function hideMenus() {
  $("#combat").hide();
  $("#gamemenu").hide();
  $("#prestige").hide();
  $("#missions").hide();
  $("#exploration").hide();
  $("#inventory").hide();
  $("#statistics").hide();
  $("#leaderboard1").hide();
  $("#settings").hide();
  $("#cores").hide();
}

function explore(loc) {
  if (POS[loc][1] <= Game.Level) {
    if (Game.MissionsCompleted[POS[loc][4]] == 1) {
      Game.Location = loc;
      Game.isInFight = 0;
      $("#combat").show();
      $("#gamemenu").hide();
      $("#exploration").hide();
      UpdateGame();
    }
  }
}

function ShowScoreMenu() {
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Simulation" + MTEXT);
  Game.isInFight = 10;
  $("#gamemenu").hide();
  $("#prestige").show();
}

function ShowMissionsMenu() {
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Missions" + MTEXT);
  Game.isInFight = 11;
  $("#gamemenu").hide();
  $("#missions").show();
  GenMissions();
}

function ShowExplorationMenu() {
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Exploration" + MTEXT);
  Game.isInFight = 12;
  $("#gamemenu").hide();
  $("#exploration").show();
  GenExplorationMenu();
}

function ShowInventoryMenu() {
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Inventory " + (Game.inventory.length) + "/" + Game.MaxInv + MTEXT);
  Game.isInFight = 16;
  $("#gamemenu").hide();
  $("#inventory").show();
}

function ShowStatsMenu() {
  UpdateGame();
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Statistics" + MTEXT);
  Game.isInFight = 13;
  $("#gamemenu").hide();
  $("#statistics").show();
}

function ShowLeaderboard() {
  TOP10();
  UpdateGame();
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Leaderboard" + MTEXT);
  Game.isInFight = 14;
  $("#gamemenu").hide();
  $("#leaderboard1").show();
}

function ShowSettings() {
  UpdateGame();
  if (url.match(/mobile/gi)) {
    MTEXT = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
  }
  $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Settings" + MTEXT);
  Game.isInFight = 15;
  $("#gamemenu").hide();
  $("#settings").show();
}

function GenExplorationMenu() {
  $("#exploration").html("");
  var QUALITY = "";
  var BTN = "";
  var LEVEL = "";
  for (var E in POS) {
    if (POS[E][3] == 0) {
      QUALITY = "Normal";
    }
    if (POS[E][3] == 1) {
      QUALITY = "Common";
    }
    if (POS[E][3] == 2) {
      QUALITY = "Uncommon";
    }
    if (POS[E][3] == 3) {
      QUALITY = "Rare";
    }
    if (POS[E][3] == 4) {
      QUALITY = "Epic";
    }
    if (POS[E][3] == 5) {
      QUALITY = "Exotic";
    }
    if (POS[E][3] == 6) {
      QUALITY = "Divine";
    }

    var MINLEVEL = Game.Level >= POS[E][1] ? "<span class='green'>" + POS[E][1] + "</span>" : "<span class='rouge'>" + POS[E][1] + "</span>";
    var MAXLEVEL = Game.Level >= POS[E][2] ? "<span class='green'>" + POS[E][2] + "</span>" : "<span class='rouge'>" + POS[E][2] + "</span>";
    var UNLOCKED = Game.Level >= POS[E][1] ? "green" : "red";
    var UNLOCKTEXT = Game.MissionsCompleted[POS[E][4]] == 1 ? "<span class='green'>" + Missions[POS[E][4]][0] + " - Finished</span>" : "<span class='rouge'>" + Missions[POS[E][4]][0] + " - Unfinished</span>";


    if (Game.Level < Game.MaxLevel || Game.FNMission < 15) {
      LEVEL = MINLEVEL + "-" + MAXLEVEL;
    } else {
      LEVEL = "<span class='green'>" + 30 + "</span>";
      QUALITY = "Divine";
    }
    if (Game.MissionsCompleted[POS[E][4]] == 1) {
      BTN = "<div class='fluid ui right floated icon rainbow button' onclick='explore(" + E + ");' >Travel <i class='" + UNLOCKED + " right arrow icon'></i></div>";
    } else {
      BTN = "";
    }

    if (POS[E][1] < Game.Level + 2 && E != 11) {
      $("#exploration").append(
        "<div class='ui segment'><h3 class='ui left floated header text2 " + UNLOCKED + "'>" + POS[E][0] + "</h3>" +
        "<div class='ui clearing divider'></div><div class='ui horizontal segments'><div class='ui segment'>" +
        "Mission required : " + UNLOCKTEXT + "<br>" +
        "Ennemy level : " + LEVEL + "<br>Highest loot quality : <span class='" + QUALITY + "'>" + QUALITY + "</span></div><div class='ui segment'>" + BTN + "</div>" +
        "</div></div>");
    }
  }
}

function GenMissions() {
  $("#MissionsList").html("");
  $("#MissionsList2").html("");
  $("#MissionsCPL").html("");
  var QUALITY = "";
  var TYPE = "";
  var LEVEL = "";
  var BTN = "";
  for (var M in Missions) {

    if (Missions[M][6] == 0) {
      TYPE = "Core";
      LEVEL = "";
    }
    if (Missions[M][6] == 1) {
      TYPE = "Key";
      LEVEL = "";
    }
    if (Missions[M][6] == 2) {
      TYPE = "OS";
    }

    if (Missions[M][7] == 1) {
      QUALITY = "1 <span class='Normal'>Normal</span>";
    }
    if (Missions[M][7] == 2000) {
      QUALITY = "1 <span class='Common'>Common</span>";
    }
    if (Missions[M][7] == 5000) {
      QUALITY = "1 <span class='Uncommon'>Uncommon</span>";
    }
    if (Missions[M][7] == 7000) {
      QUALITY = "1 <span class='Rare'>Rare</span>";
    }
    if (Missions[M][7] == 8500) {
      QUALITY = "1 <span class='Epic'>Epic</span>";
    }
    if (Missions[M][7] == 9500) {
      QUALITY = "1 <span class='Exotic'>Exotic</span>";
    }
    if (Missions[M][7] == 9850) {
      QUALITY = "1 <span class='Divine'>Divine</span>";
    }
    var UNLOCKED = Game.Level >= Missions[M][2] ? "green" : "red";
    if (Game.MissionStarted[0] == true) {
      BTN = "";
      if (Game.MissionStarted[1] == M) {
        Status = "<span class='green'>In Progress</span>";
        BTN = "";
      }
    } else {
      BTN = "<br><div class='ui icon rainbow button' onclick='mission(" + M + ");' >Launch <i class='" + UNLOCKED + " right arrow icon'></i></div>";
    }

    var Status = Game.MissionsCompleted[M] == 1 ? "<span class='green'>Complete</span>" : "<span class='rouge'>Incomplete</span>";
    if (Game.MissionStarted[1] == M && Game.MissionsCompleted[M] == 0) {
      Status = "<span class='jaune'>In Progress</span>";
      BTN = "<br><div class='ui icon rainbow button' onclick='ResetMission();' >Cancel mission <i class='green right arrow icon'></i></div>";
    }
    if (Game.MissionsCompleted[M] == 1 && Missions[M][3] != 2) {
      BTN = "<br><div class='ui icon rainbow button' onclick='MissionStory(" + M + ");' >Story <i class='green right arrow icon'></i></div>";
    }

    var REQLEVEL = Game.Level >= Missions[M][2] ? "<span class='green'>" + Missions[M][2] + "</span>" : "<span class='rouge'>" + Missions[M][2] + "</span>";

    if (Missions[M][3] != 2) {
      if (Game.MissionsCompleted[Missions[M][9]] == 1 || Missions[M][9] == -1) {
        var DESCRIPTION = Game.MissionsCompleted[M] == 0 ? "<div class='ui segment'>" + "Level Required : " + REQLEVEL + "<br>Rewards : <br>- <span class='jaune'>" + fix(Missions[M][5], 3) + "</span> EXP<br> - " + QUALITY + " " + TYPE + LEVEL + "</div>" : "<div class='ui segment'>Level : " + REQLEVEL + "</div>";
        var CONTENT = (
          "<div class='ui segment'><h3 class='ui left floated header text2 " + UNLOCKED + "'>" + Missions[M][0] + "</h3>" +
          "<div class='ui clearing divider'></div><div class='ui horizontal segments'>" + DESCRIPTION + "<div class='ui segment'>Status : " + Status + BTN + "</div>" +
          "</div></div>"
        );

        if (Game.MissionsCompleted[M] == 0) {
          $("#MissionsList").append(CONTENT);
        }

        if (Game.MissionsCompleted[M] == 1) {
          $("#MissionsCPL").append(CONTENT);
        }
      }
    }

    if (Missions[M][2] <= Game.Level && Missions[M][3] == 2) {
      if (Game.MissionsCompleted[Missions[M][9]] == 1 || Missions[M][9] == -1) {
        var CNTENT = ("<div class='ui segment'><h3 class='ui left floated header text2 " + UNLOCKED + "'>" + Missions[M][0] + "</h3>" +
          "<div class='ui clearing divider'></div><div class='ui horizontal segments'><div class='ui segment'>" +
          "Level Required : " + REQLEVEL + "<br>Rewards : <br> - " + fix(Missions[M][5], 3) + "<i class='bleu dna icon'></i> Fragments <br> - " + QUALITY + " " + TYPE + LEVEL + "</div><div class='ui segment'>" + BTN + "</div>" +
          "</div></div>");

        $("#MissionsList2").append(CNTENT);
      }
    }
  } //NAME, DESC, LEVEL, TYPE, VALUE, EXP, REWARD TYPE, QUALITY
}

function ResetMission() {
  if (Game.MissionStarted[0] == true) {
    Game.MissionStarted = [false, 0, 0];
    $("#combat").show();
    $("#missions").hide();
    Game.conf4 = 0;
    $("#AutoMissions").checkbox("uncheck");
    showmessage("Mission Canceled", "You can restart this mission in the 'mission' menu.<br>- Auto start mission <span class='rouge'>disabled</span>.");
    if (Game.Location > 0) {
      Game.Location--;
    }
    UpdateGame();
  }
}

function MissionStory(id) {
  showmessage("Mission Information", Missions[id][1]);
}

function mission(id) {
  if (Game.MissionStarted[0] == false && Game.Level >= Missions[id][2]) {
    Game.MissionStarted = [true, id, 0];
    Game.isInFight = 0;
    $("#combat").show();
    $("#missions").hide();
    showmessage("Mission Information", Missions[id][1]);
    UpdateGame();
  }
}

var TSK = 0;

function CompleteMission() {
  var TIER = "";
  var TIERRANK = "";
  var LEVELUP = "";
  if (Game.MissionStarted[0] == true && Game.isInFight != 2) {
    if (Missions[Game.MissionStarted[1]][3] == 1 || Missions[Game.MissionStarted[1]][3] == 2) {
      if (Game.MissionStarted[2] >= Missions[Game.MissionStarted[1]][4]) {
        Game.isInFight = 2;
        TSK = 1;

        if (Game.Level < Game.MaxLevel) {
          Game.xp[0] += Missions[Game.MissionStarted[1]][5];
          if (Game.xp[0] >= Game.xp[1]) {
            Game.xp[0] -= Game.xp[1];
            Game.Level++;
            UpdateUI();
            LEVELUP = "<font class='bleu'>LEVEL UP ! (<span class='blanc'>" + Game.Level + "</span>)</font><br>";
          }
        }

        if (Missions[Game.MissionStarted[1]][6] == 0) { //CORE REWARD
          if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
            newItem(0, Game.Ranking, Missions[Game.MissionStarted[1]][7]);
          } else {
            newItem(0, Game.Level, Missions[Game.MissionStarted[1]][7]);
          }
          if (Game.Level < Game.MaxLevel || Game.FNMission < 15) {
            TIER = "Level";
            TIERRANK = Game.inventory[Game.inventory.length - 1].level;
          } else {
            TIER = "Score";
            TIERRANK = "<i class='gem icon'></i>" + Math.floor(Game.inventory[Game.inventory.length - 1].level * 10);
          }

          var UPS = Game.inventory[Game.inventory.length - 1].ups > 0 ? "" + Game.inventory[Game.inventory.length - 1].ups + "<i class='key icon'></i>" : "";
          $("#rewards-loot").html("<div class='ui comments'><div class='comment CoreClass" + Game.inventory[Game.inventory.length - 1].type + "'><div class='classBar" + Game.inventory[Game.inventory.length - 1].type + "'></div><div class='statistic GS'><div class='value'>" + TIER + "</div><div class='label'> " + TIERRANK + "</div></div>" + Game.inventory[Game.inventory.length - 1].name + "<span class='" + Game.inventory[Game.inventory.length - 1].class + "'> " + UPS + "</span><br><span class='" + Game.inventory[Game.inventory.length - 1].class + "'> " + Game.inventory[Game.inventory.length - 1].class + " </span><br> " + fix(Game.inventory[Game.inventory.length - 1].life, 5) + " <i class='red heart icon'></i> " + fix(Game.inventory[Game.inventory.length - 1].power, 5) + " <i class='blue crosshairs icon'></i></div></div>");
        }
        if (Missions[Game.MissionStarted[1]][3] == 1) {
          $("#rewards-title").html("<span class='vert'>Successfully completed the mission !</span>");
        } else {
          $("#rewards-title").html("<span class='vert'>Fortress cleared !</span>");
        }
        var btncntnt = url.match(/mobile/gi) ? "<i class='times icon'></i>Finish" : "<i class='times icon ICR'></i>Finish (F)";
        $("#btn-CRW").html("<div onclick='hideMissionRewards();' class='big ui bottom attached labeled icon closing button'>" + btncntnt + "</div>");
        $("#rewards-desc").html("");
        $("#rewards-text").html(LEVELUP + "+<span class='vert bold'>" + fix(Math.floor(Missions[Game.MissionStarted[1]][5]), 5) + "</span> EXP ");
        $("#combat").hide();
        $("#rewards").show();
        //KEYS & Relic MISSING
      }
    }
  }
}

function hideMissionRewards() {
  if (Game.confirmations == 1) {
    $("#modal-4").modal("hide");
  }
  if (TSK == 1) {
    Game.MissionsCompleted[Game.MissionStarted[1]] = 1;
    Game.MissionStarted = [false, 0, 0];
    TSK = 0;
  }
  Game.isInFight = 0;
  $("#rewards").hide();
  $("#combat").show();
  UpdateGame();
}

function hideRewards() {
  if (Game.confirmations == 1) {
    $("#modal-4").modal("hide");
  }
  Game.isInFight = 0;
  $("#rewards").hide();
  $("#combat").show();
  UpdateGame();
  CompleteMission();
}

function UpdatePage() {
  location.reload();
}

function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  if (hex == 0) {
    hex = "00";
  }
  return hex;
}

function fullColorHex(r, g, b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red + green + blue;
}