

//#region State

const mahomes = {

    health: 100,
    maxhealth: 100,
    damage: 5,
    lvl: 1
}

let heroes = [
    {
        name: 'Purdy',
        health: 100,
        maxhealth: 100,
        lvl: 1,
        damage: 20
    },
    {
        name: 'Shanahan',
        health: 100,
        maxhealth: 100,
        lvl: 1,
        damage: 30
    },
]

//#endregion

//#region Logic

function attackBoss() {
    let bossDamage = 0
    heroes.forEach(hero => {
        if (hero.health == 0) return
        bossDamage += hero.damage
    })
    mahomes.health -= bossDamage

    lvlUpBoss()
    drawBossStats()
}

function bossAttack() {
    heroes.forEach(hero => {
        hero.health -= Math.floor(mahomes.damage * (mahomes.lvl * Math.random()))
        if (hero.health < 1) {
            hero.health = 0
        }
    })
    lvlUpHero()
    drawHeroStats()
}

function lvlUpBoss() {
    if (mahomes.health <= 15) {
        mahomes.lvl++
        mahomes.damage *= mahomes.lvl + (Math.random())
        mahomes.maxhealth *= mahomes.lvl + Math.random()
        mahomes.health = mahomes.maxhealth
    }

}

function lvlUpHero() {
    for(let i =0; i <heroes.length; i++){
        let hero = heroes[i]
        if (hero.health <= 15) {
            hero.lvl++
            hero.damage *= Math.floor(hero.lvl + Math.random())
            hero.maxhealth *= Math.floor(hero.lvl + Math.random())
            hero.health = hero.maxhealth
        }
        if(hero.health > 100){
            hero.health = 100
        }
    }

}

function healHero() {
    for (let i = 0; i < heroes.length; i++) {

        const hero = heroes[i]
        const recoveryPoints = Math.floor(10 * Math.random())
        hero.health += recoveryPoints
    }

    drawHeroStats()
}
//#endregion

//#region Graphics

function drawHeroStats() {
    heroes.forEach(hero => {
        const heroElem = document.getElementById(hero.name)
        const heroHealthElem = heroElem.querySelector('.health')
        // @ts-ignore
        heroHealthElem.innerText = hero.health.toString()
    })

}

function drawBossStats() {
    const bossHealthPercentage = Math.floor((mahomes.health / mahomes.maxhealth) * 100)
    const bossElem = document.getElementById('boss')
    const progressElem = bossElem.querySelector('.progress')
    progressElem.ariaValueNow = bossHealthPercentage.toString()
    const progressBarElem = bossElem.querySelector('.progress-bar')
    // @ts-ignore
    progressBarElem.style.width = bossHealthPercentage + '%'

}

setInterval(healHero, 3000)
setInterval(bossAttack, 1000)

//#endregion