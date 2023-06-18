const close = document.querySelector('.close')
import  toHandleCase  from "./toHandleCase.js";

const modal = document.querySelector('.modal')
function toggleModal(){
    modal.classList.toggle('ativo')
}

export default function createModal(name, id, sprite, types, abilities, height, weight, status){

    const modalBox = document.createElement('div')
    modalBox.className='box'
    modal.appendChild(modalBox)
    modalBox.appendChild(close)

    const leftContainer = document.createElement('div')
    leftContainer.className = 'left-container ' + types[0].type.name
    modalBox.appendChild(leftContainer)

    const leftContainerIconBox = document.createElement('div')
    leftContainerIconBox.className ='icon-box'
    leftContainer.appendChild(leftContainerIconBox)

    const leftContainerIconMask = document.createElement('div')
    leftContainerIconMask.className ='icon-mask'
    leftContainerIconBox.appendChild(leftContainerIconMask)

    const leftContainerIconType = document.createElement('img')
    leftContainerIconType.src ='assets/icon-types/'+ types[0].type.name+'.svg'
    leftContainerIconMask.appendChild(leftContainerIconType)

    const leftContainerImageBox = document.createElement('div')
    leftContainerImageBox.className = 'img-box'
    leftContainer.appendChild(leftContainerImageBox)

    const leftContainerPokemonImage = document.createElement('img')
    leftContainerPokemonImage.src = sprite
    leftContainerImageBox.appendChild(leftContainerPokemonImage)


    const rightContainerDiv = document.createElement('div')
    rightContainerDiv.className='right-container-mask'
    modalBox.appendChild(rightContainerDiv)

    const rightContainer = document.createElement('div')
    rightContainer.className='right-container'
    rightContainerDiv.appendChild(rightContainer)

    const generalInfo = document.createElement('div')
    generalInfo.className ='general-info'
    rightContainer.appendChild(generalInfo)

    const generalInfoName = document.createElement('h2')
    generalInfoName.className ='name'
    generalInfoName.innerText = toHandleCase(name)
    generalInfo.appendChild(generalInfoName)

    const PokemonNumber = document.createElement('span')
    PokemonNumber.className ='number'
    PokemonNumber.innerText =  id<10 ? '#00' +id : id<100 ? '#0'+id : '#'+id
    generalInfoName.appendChild(PokemonNumber)

    const typesListModal = document.createElement('ul')
    typesListModal.className = 'types-modal'
    generalInfo.appendChild(typesListModal)
    
// typesListModal.forEach(
//         type =>{ 
//         let typesListModalItem= document.createElement('li')
//         typesListModalItem.innerHTML = '<span class="tag-type' + type + '>' + type + '</span>' 
// })

    // let typesListModalItem= document.createElement('li')
    // typesListModalItem.innerHTML = '<span class="tag-type' + ' grass' + '">' + 'grass' + '</span>' 
    // typesListModal.appendChild(typesListModalItem)


    types.forEach(
        item => {
            typesListModal.appendChild(document.createElement('li')).innerHTML= '<span class="tag-type ' + item.type.name + '">' + item.type.name + '</span>' 
        }
    )

    const InfosModal = document.createElement('ul')
    InfosModal.className = 'infos'
    generalInfo.appendChild(InfosModal)

    const info1 = document.createElement('li')
    info1.innerHTML = ' <span>Height</span> <strong>' + height/10 + 'm</strong>'
    InfosModal.appendChild(info1)

    const info2 = document.createElement('li')
    info2.innerHTML = ' <span>Weight</span> <strong>' + weight/10 + 'kg</strong>'
    InfosModal.appendChild(info2)

    const info4 = document.createElement('li')
    info4.innerHTML = ' <span>Abilities</span> <strong>' + toHandleCase(abilities[0].ability.name) + '</strong>'
    InfosModal.appendChild(info4)

    const weakness = document.createElement('div')
    weakness.className ='weakness'
    rightContainer.appendChild(weakness)

    const weaknessTitle = document.createElement('h4')
    weaknessTitle.innerText = 'Weaknesses'
    weakness.appendChild(weaknessTitle)
    
    const weaknessList = document.createElement('ul')
    weaknessList.className = 'weak'
    weakness.appendChild(weaknessList)
    
//     weaknesses.forEach(
//         weak =>{ 
//         let weaknessTypesList= document.createElement('li')
//         typesListModalItem.innerHTML = '<span class="tag-type' + weak + '>' + weak + '</span>' 
// })
    
    axios(
        {
            baseURL: types[0].type.url
        })
    .then(r => r.data)
    .then( weak => weak.damage_relations.double_damage_from.forEach(
        (item,index) =>{
            weaknessList.appendChild(document.createElement('li')).innerHTML= '<span class="tag-type ' + item.name + '">' + item.name + '</span>' 
        }
    ) )

    const statsBox = document.createElement('div')
    statsBox.className = 'stats-box'
    rightContainer.appendChild(statsBox)

    const statsTitle = document.createElement('h4')
    statsTitle.innerText = 'Stats'
    statsBox.appendChild(statsTitle)

    const stats = document.createElement('div')
    stats.className = 'stats'
    statsBox.appendChild(stats)

    const hpStatusSection = document.createElement('div')
    hpStatusSection.className='single-stats'
    stats.appendChild(hpStatusSection)

    const hpStatusSectionTitle = document.createElement('span')
    hpStatusSectionTitle.innerText = 'HP'
    hpStatusSection.appendChild(hpStatusSectionTitle)

    const hpStatsBarList = document.createElement('ul')
    hpStatsBarList.className='stats-bar'
    hpStatusSection.appendChild(hpStatsBarList)

    const hpStatsBarFull = document.createElement('div')
    hpStatsBarFull.className='bar hp'
    hpStatsBarFull.style = 'width :'+ status[0].base_stat + '% !important; ' 
    
    hpStatsBarList.appendChild(hpStatsBarFull)

    const hpSeparator = document.createElement('ul')
    hpSeparator.innerHTML = "<li></li> <li></li> <li></li> <li></li> "
    hpStatsBarFull.appendChild(hpSeparator)

    const attackStatusSection = document.createElement('div')
    attackStatusSection.className='single-stats'
    stats.appendChild(attackStatusSection)

    const attackStatusSectionTitle = document.createElement('span')
    attackStatusSectionTitle.innerText = 'Attack'
    attackStatusSection.appendChild(attackStatusSectionTitle)

    const attackStatsBarList = document.createElement('ul')
    attackStatsBarList.className='stats-bar'
    attackStatusSection.appendChild(attackStatsBarList)

    const attackStatsBarFull = document.createElement('div')
    attackStatsBarFull.className='bar attack'
    attackStatsBarFull.style = 'width :'+ status[1].base_stat + '% !important; ' 
    attackStatsBarList.appendChild(attackStatsBarFull)

    const attackSeparator = document.createElement('ul')
    attackSeparator.innerHTML = "<li></li> <li></li> <li></li> <li></li> "
    attackStatsBarFull.appendChild(attackSeparator)

    const defenseStatusSection = document.createElement('div')
    defenseStatusSection.className='single-stats'
    stats.appendChild(defenseStatusSection)

    const defenseStatusSectionTitle = document.createElement('span')
    defenseStatusSectionTitle.innerText = 'Defense'
    defenseStatusSection.appendChild(defenseStatusSectionTitle)

    const defenseStatsBarList = document.createElement('ul')
    defenseStatsBarList.className='stats-bar'
    defenseStatusSection.appendChild(defenseStatsBarList)

    const defenseStatsBarFull = document.createElement('div')
    defenseStatsBarFull.className='bar defense'
    defenseStatsBarFull.style = 'width :'+ status[2].base_stat + '% !important; ' 
    defenseStatsBarList.appendChild(defenseStatsBarFull)

    const defenseSeparator = document.createElement('ul')
    defenseSeparator.innerHTML = "<li></li> <li></li> <li></li> <li></li> "
    defenseStatsBarFull.appendChild(defenseSeparator)

    const spAttackStatusSection = document.createElement('div')
    spAttackStatusSection.className='single-stats'
    stats.appendChild(spAttackStatusSection)

    const spAttackStatusSectionTitle = document.createElement('span')
    spAttackStatusSectionTitle.innerText = 'Sp attack'
    spAttackStatusSection.appendChild(spAttackStatusSectionTitle)

    const spAttackStatsBarList = document.createElement('ul')
    spAttackStatsBarList.className='stats-bar'
    spAttackStatusSection.appendChild(spAttackStatsBarList)

    const spAttackStatsBarFull = document.createElement('div')
    spAttackStatsBarFull.className='bar sp-attack'
    spAttackStatsBarFull.style = 'width :'+ status[3].base_stat + '% !important; ' 
    spAttackStatsBarList.appendChild(spAttackStatsBarFull)

    const spAttackSeparator = document.createElement('ul')
    spAttackSeparator.innerHTML = "<li></li> <li></li> <li></li> <li></li> "
    spAttackStatsBarFull.appendChild(spAttackSeparator)

    const spDefenseStatusSection = document.createElement('div')
    spDefenseStatusSection.className='single-stats'
    stats.appendChild(spDefenseStatusSection)

    const spDefenseStatusSectionTitle = document.createElement('span')
    spDefenseStatusSectionTitle.innerText = 'Sp defense'
    spDefenseStatusSection.appendChild(spDefenseStatusSectionTitle)

    const spDefenseStatsBarList = document.createElement('ul')
    spDefenseStatsBarList.className='stats-bar'
    spDefenseStatusSection.appendChild(spDefenseStatsBarList)

    const spDefenseStatsBarFull = document.createElement('div')
    spDefenseStatsBarFull.className='bar sp-defense'
    spDefenseStatsBarFull.style = 'width :'+ status[4].base_stat + '% !important; ' 
    spDefenseStatsBarList.appendChild(spDefenseStatsBarFull)

    const spDefenseSeparator = document.createElement('ul')
    spDefenseSeparator.innerHTML = "<li></li> <li></li> <li></li> <li></li> "
    spDefenseStatsBarFull.appendChild(spDefenseSeparator)

    const speedStatusSection = document.createElement('div')
    speedStatusSection.className='single-stats'
    stats.appendChild(speedStatusSection)

    const speedStatusSectionTitle = document.createElement('span')
    speedStatusSectionTitle.innerText = 'Speed'
    speedStatusSection.appendChild(speedStatusSectionTitle)

    const speedStatsBarList = document.createElement('ul')
    speedStatsBarList.className='stats-bar'
    speedStatusSection.appendChild(speedStatsBarList)

    const speedStatsBarFull = document.createElement('div')
    speedStatsBarFull.className='bar speed'
    speedStatsBarFull.style = 'width :'+ status[5].base_stat + '% !important; ' 
    speedStatsBarList.appendChild(speedStatsBarFull)

    const speedSeparator = document.createElement('ul')
    speedSeparator.innerHTML = "<li></li> <li></li> <li></li> <li></li> "
    speedStatsBarFull.appendChild(speedSeparator)

    modalBox.animate([
        // keyframes
        { transform: 'translateY(400px)'
        },
        { transform: 'translateY(0)' },
      ],{
        duration: 200,
      })

}

close.addEventListener('click', toggleModal)
