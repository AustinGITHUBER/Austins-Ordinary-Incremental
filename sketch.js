setup = function() {
  frameRate(20)
  version1 = {
    money1: {
      normal: 0,
      stringNormal: nfc(0),
      scientific: 0,
      logarithm: 0,
      add: function(other = 0) {
        version1.money1.normal += other
      },
      subtract: function(other = 0) {
        version1.money1.normal -= other
      },
      multiply: function(other = 1) {
        version1.money1.normal *= other
      },
      divide: function(other = 1) {
        version1.money1.normal /= other
      },
      currentVersion: 'scientific',
      place1: createVector(0, 60)
    },
    news1: {
      place1: createVector(0, 30),
      random1: random(),
      newsArray1: ['Hello, this was made on 12/16/2020.', 'This is definently a normal incremental.', `Is it weird when people say )`, `Times you encountered this before: `],
      newsOfChoice1: '',
      newsArray1Index3: -1
    },
    createSomething1: {
      buttons: [createButton(`Click to begin earning A`), createButton('Upgrade 1st A generator, Costs 1e2')],
      canvases: []
    },
    playerClicksSomething1: {
      beginEarningMoney1: false,
      timesClickedUpgradeAGenerator: 0
    }
  }
  version1.createSomething1.buttons[0].mousePressed(earningMoney1)
  version1.createSomething1.buttons[0].size(200, 60)
  version1.createSomething1.buttons[0].position(0, 120)
  version1.createSomething1.buttons[1].mousePressed(upgrade1)
  version1.createSomething1.buttons[1].size(200, 60)
  version1.createSomething1.buttons[1].position(0, 120)
  version1.createSomething1.buttons[1].style('opacity', 0)
  version1.createSomething1.buttons[1].style('pointer-events', 'none')
}

draw = function() {
    version1.news1.newsArray1[2] = `Is it weird when people say ${version1.money1.scientific}?`
  version1.createSomething1.canvases.push(createCanvas(windowWidth, windowHeight))
  version1.news1.place1.x -= 10
  background(220)
  if (version1.playerClicksSomething1.beginEarningMoney1) {
    version1.money1.add(1)
  }
  version1.money1.add(version1.playerClicksSomething1.timesClickedUpgradeAGenerator)
  if (version1.money1.normal < 0) version1.money1.normal = 0
  fixStringNormal()
  fixScientific()
  fixLogarithm()
  if (version1.money1.normal < 0) version1.money1.normal = 0
  textSize(30)
  text(version1.news1.newsOfChoice1, version1.news1.place1.x, version1.news1.place1.y)
  if (version1.news1.place1.x <= 0) {
    news1Function1()
  }
    text(`A: ${version1.money1.scientific}`, version1.money1.place1.x, version1.money1.place1.y)
  line(0, 35, windowWidth, 35)
}

fixStringNormal = function() {
  version1.money1.stringNormal = version1.money1.normal + ''
}

fixScientific = function() {
  version1.money1.scientific = (version1.money1.stringNormal.slice(0, 1) + '.' + version1.money1.stringNormal.slice(1, 3)) + 'e' + (version1.money1.stringNormal.length - 1)
}

fixLogarithm = function() {
  version1.money1.logarithm = 'e' + ((version1.money1.stringNormal.length - 1) + '.' + version1.money1.stringNormal.slice(0, 3))
}

windowResized = function() {
  version1.news1.place1.x = windowWidth
}

changeNotation = function() {
  if (version1.money1.currentVersion == 'scientific') {
    version1.money1.currentVersion = 'logarithm'
  }
  else if (version1.money1.currentVersion == 'logarithm') {
    version1.money1.currentVersion = 'scientific'
  }
}

news1Function1 = function() {
  version1.news1.place1.x = windowWidth
    version1.news1.random1 = floor(random(version1.news1.newsArray1.length))
    version1.news1.newsOfChoice1 = version1.news1.newsArray1[version1.news1.random1]
    if (version1.news1.newsOfChoice1 == version1.news1.newsArray1[2]) {
      if (version1.money1.normal > 0) {
        return
      }
      else {
        news1Function1()
      }
    }
    if (version1.news1.newsOfChoice1 == version1.news1.newsArray1[3]) {
      version1.news1.newsArray1Index3++
      version1.news1.newsArray1[3] = `Times you encountered this before: ${version1.news1.newsArray1Index3}`
      version1.news1.newsOfChoice1 = version1.news1.newsArray1[3]
    }
}
  
earningMoney1 = function() {
  version1.playerClicksSomething1.beginEarningMoney1 = true
  version1.createSomething1.buttons[0].style('pointer-events', 'none')
  version1.createSomething1.buttons[0].style('opacity', 0)
  version1.createSomething1.buttons[1].style('opacity', 1)
  version1.createSomething1.buttons[1].style('pointer-events', 'all')
}
  
upgrade1 = function() {
  buyWithNoBenefit(100, function() {
    version1.playerClicksSomething1.timesClickedUpgradeAGenerator++
  })
}

buyWithNoBenefit = function(cost = 0, theRestOfTheFunction = function(){}) {
  if (version1.money1.normal >= cost) {
    version1.money1.subtract(cost)
    theRestOfTheFunction()
  }
}