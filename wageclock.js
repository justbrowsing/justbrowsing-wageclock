var wage = "0.00"
var mode = "start";
var loop, toggle;
var begin = new Date().valueOf();
var now = begin;
var row = "-1";

function getEarned()
{
  var diff = (now.valueOf() - begin)/1000;
  var earned = ((wage/3600)*diff).toFixed(5);
  var pattern = /\d+(\.\d{1,2})/;
  var integers = earned.split(".");
  var withcommas = integers[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  var decimals = earned.split(pattern);
  return "<b>" + withcommas + decimals[1] + "</b>" + decimals[2];
}

function flatRate(unit)
{
  var flat = wage;
  if (unit == "minute")
  {
    flat = (wage/60).toFixed(5);
  }
  else if (unit == "second")
  {
    flat = (wage/3600).toFixed(5);
  }
  var pattern = /\d+(\.\d{1,2})/;
  var integers = flat.split(".");
  var withcommas = integers[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  var decimals = flat.split(pattern);
  return "<b>" + withcommas + decimals[1] + "</b>" + decimals[2];
}  

function getRate(unit)
{
  var diff = (now.valueOf() - begin)/1000;
  var multiplier = 1;

  if (unit == "minute")
  {
    multiplier = diff < 60 ? diff : 60;
  }
  else if (unit == "hour")
  {
    multiplier = diff < 3600 ? diff : 3600;
  }

  if (diff < 1)
  {
    var rate = (wage/1).toFixed(5);
  }
  else
  {
    var rate = ((wage*multiplier)/(diff)).toFixed(5);
  }

  var pattern = /\d+(\.\d{1,2})/;
  var integers = rate.split(".");
  var withcommas = integers[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  var decimals = rate.split(pattern);
  return "<b>" + withcommas + decimals[1] + "</b>" + decimals[2];
}

function getElapsed()
{
  var elapsed = (now.valueOf() - begin);
  var HH = Math.floor((Math.floor(elapsed / 1000)) / 3600);
  var HH = HH < 10 ? "0" + HH : HH;
  var MM = Math.floor(Math.floor((Math.floor(elapsed / 1000)) % 3600) / 60);
  var MM = MM < 10 ? "0" + MM : MM;
  var SS = Math.floor(Math.floor(elapsed / 1000) % 60);
  var SS = SS < 10 ? "0" + SS : SS;
  var MS =  Math.floor(Math.floor(elapsed % 1000) / 100);
  return HH + ":" + MM + ":" + SS + "." + MS;
}

function wageClock(mode)
{
  toggle = document.getElementById('wageButton').innerHTML;

  if(row != -1)
  {
    document.getElementById('fullscreen').innerHTML = document.getElementById(row).innerHTML;
  }

  if(mode == "loop")
  {
    now = new Date();
    wage = document.getElementById('userinput').value
    document.getElementById('time').innerHTML = getElapsed();

    if(document.getElementById('mode1').checked)
    {
      document.getElementById('modular').innerHTML = "$" + getEarned();
      document.getElementById('perminute').innerHTML = "$" + flatRate("minute");
      document.getElementById('persecond').innerHTML = "$" + flatRate("second");
    }
    else
    {
      document.getElementById('modular').innerHTML = "$" + getRate("hour");
      document.getElementById('perminute').innerHTML = "$" + getRate("minute");
      document.getElementById('persecond').innerHTML = "$" + getRate("second");
    }

    loop = setTimeout("wageClock('loop');",200);
  }
  else if(toggle == "Stop")
  {
    window.clearInterval(loop);
    document.getElementById('wageButton').innerHTML = "Start";
  }
  else
  {
    if(!begin) { begin = new Date().valueOf(); }
    document.getElementById('wageButton').innerHTML = "Stop";
    wageClock("loop");
  }
}

function plusHour()
{
 begin -= 3600000;
 document.getElementById('time').innerHTML = getElapsed();
}

function minusHour()
{
  begin += 3600000;
  var diff = (now.valueOf() - begin)/1000;
  if (diff < 0) { begin = now.valueOf(); }
  document.getElementById('time').innerHTML = getElapsed();
}

function plusMin()
{
  begin -= 60000;
  document.getElementById('time').innerHTML = getElapsed();
}

function minusMin()
{
  begin += 60000;
  var diff = (now.valueOf() - begin)/1000;
  if (diff < 0) { begin = now.valueOf(); }
  document.getElementById('time').innerHTML = getElapsed();
}

function plusTen()
{
  begin -= 10000;
  document.getElementById('time').innerHTML = getElapsed();
}

function minusTen()
{
  begin += 10000;
  var diff = (now.valueOf() - begin)/1000;
  if (diff < 0) { begin = now.valueOf(); }
  document.getElementById('time').innerHTML = getElapsed();
}

function resetClock()
{
  begin = new Date().valueOf();
  document.getElementById('time').innerHTML = "00:00:00.0";
  var modlabel = (document.getElementById('mode1').checked) ? "Earned:" : "Per hour:";
  document.getElementById('textmod').innerHTML = modlabel;
  document.getElementById('modular').innerHTML = "$<b>0.00</b>000";
  document.getElementById('perminute').innerHTML = "$<b>0.00</b>000";
  document.getElementById('persecond').innerHTML = "$<b>0.00</b>000";
}

function expandRow(rowNum)
{
  row = rowNum;
  document.getElementById('fullscreen').innerHTML = document.getElementById(row).innerHTML;
  document.getElementById('container').style.display = "none";
  document.getElementById('floater').style.display = "none";
  document.getElementById('fullscreen').style.display = "block";
}
function collapseRow()
{
  document.getElementById('container').style.display = "block";
  document.getElementById('floater').style.display = "block";
  document.getElementById('fullscreen').style.display = "none";
}

function slideToggle(modeNum)
{
  if (modeNum == "mode1")
  {
    document.getElementById('textmod').innerHTML = "Earned:";
  }
  else
  {
    document.getElementById('textmod').innerHTML = "Per hour:";
  }
}
