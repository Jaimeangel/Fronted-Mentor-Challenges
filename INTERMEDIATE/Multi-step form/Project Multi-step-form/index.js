const divContent=document.querySelector(".main-block__contenido")
const divButtons=document.querySelector(".main-block__button")

class StageForm{
    constructor({
        nodoButtons,
        nodoContent
    }){
        this.currentStep=1;
        this.stageButton=[
            {
                step:1,
                text:"your info"
            },
            {
                step:2,
                text:"select plan"
            },
            {
                step:3,
                text:"add-ons"
            },
            {
                step:4,
                text:"summary"
            }
        ];
        this.plan_type={
            periodo:{
                mo:{
                    acronym:'mo',
                    name:'monthly'
                },
                yr:{
                    acronym:'yr',
                    name:'annually'
                }
            },
            type_plan:[
                {tipo:'arcade',price:9,img:'icon-arcade.svg',select:false},
                {tipo:'advanced',price:12,img:'icon-advanced.svg',select:false},
                {tipo:'pro',price:15,img:'icon-pro.svg',select:false}
            ]
        };
        this.info_user={
            name_user:'',
            email_user:'',
            phone_user:'',
            type_plan:false,
            info_plan:{
                price:'',
                name_plan:''
            },
            extra_plan:{

            }
        };
        this.nodoButtons=nodoButtons;
        this.nodoContent=nodoContent;
    }
    startStageForm(){
        this.loadButtons()
        this.loadStructureContent()
        this.activeButton()
    }
    loadButtons(){
        const divBotones=document.createElement('div')
        divBotones.classList.add('main-block__divBoton')

        this.stageButton.map(boton=>{
            const divBoton=document.createElement('div')
            divBoton.classList.add('buttonContent')

            const botonStep=document.createElement('button')
            botonStep.textContent=`${boton.step}`
            botonStep.classList.add('buttonContent__button')

            const botonInfo=document.createElement('div')
            botonInfo.classList.add('buttonContent__info')
            const botonInfo_p1=document.createElement('p')
            botonInfo_p1.textContent=`STEP ${boton.step}`
            const botonInfo_p2=document.createElement('p')
            botonInfo_p2.textContent=`${boton.text.toUpperCase()}`

            botonInfo.append(botonInfo_p1,botonInfo_p2)

            divBoton.append(botonStep,botonInfo)

            divBotones.appendChild(divBoton)
        })
        this.nodoButtons.append(divBotones)
    }
    activeButton(){
        const botones=document.querySelectorAll('.buttonContent__button')
        botones.forEach(boton=>{
            if(parseInt(boton.textContent)===this.currentStep){
                boton.classList.add('--active')
            }else{
                if(boton.classList.contains('--active')){
                    boton.classList.remove('--active')
                }
            }
        })

        const leftButton=document.querySelector('.--left-button')
        const buttonsDiv=document.querySelector('.stageContent__botones')

        if(this.currentStep!==1){
            leftButton.classList.add('show')
        }else{
            leftButton.classList.remove('show')
        }
        if(this.currentStep===5){
            buttonsDiv.classList.add('none')
        }
        this.contentStage()
        
    }
    nextButtonFunction(){
        if(this.currentStep<this.stageButton.length){
            this.currentStep+=1
            this.activeButton()
        }else{
            this.currentStep=this.stageButton.length+1
            this.activeButton()
        }

    }
    backButtonFunction(){
        if(this.currentStep<=this.stageButton.length){
            this.currentStep-=1
            this.activeButton()
        }

    }
    loadStructureContent(){
        const divContent=document.createElement('div')
        divContent.classList.add('stageContent')

        const content=document.createElement('div')
        content.classList.add('stageContent__contenido')

        const botones=document.createElement('div')
        botones.classList.add('stageContent__botones')

        const backButton=document.createElement('button')
        backButton.textContent='Go Back'
        backButton.classList.add('--left-button')
        
        const nextButton=document.createElement('button')
        nextButton.classList.add('--right-button')
        nextButton.textContent='Next Step'

        botones.append(backButton,nextButton)

        divContent.append(content,botones)
        this.nodoContent.appendChild(divContent)
    }
    clear(){
        const divContent=document.querySelector('.stageContent__contenido')
        divContent.innerHTML=''
    }
    contentStage(){
        this.clear()
        switch(this.currentStep){
            case 1:
                this.stage1()
                break
            case 2:
                this.stage2()
                break
        }
    }
    changeUIButtonChangePlan(){
        if(this.info_user.type_plan!==true){
            const btnChangePlan=document.querySelector('.buttonPlan');
            const pChildF= btnChangePlan.firstChild;
            pChildF.classList.toggle('changeColor')
            const pChildL=btnChangePlan.lastChild;
            pChildL.classList.toggle('changeColor')
        }else{
            const btnChangePlan=document.querySelector('.buttonPlan');
            const pChildF= btnChangePlan.firstChild;
            pChildF.classList.toggle('changeColor')
            const pChildL=btnChangePlan.lastChild;
            pChildL.classList.toggle('changeColor')

        }
    }
    changePriceTypePlan(){
        const stageTypePlan=document.querySelectorAll('.stage2Card__info')
        stageTypePlan.forEach(element=>{
            const plan=this.plan_type.type_plan.find(plan=>plan.tipo===element.firstChild.textContent.toLowerCase());
            const price=plan.price;
            element.lastChild.innerHTML=''

            if(this.info_user.type_plan){
                const type_period=this.plan_type.periodo.yr.acronym;
                const price_yearly=(price*12);
                const p_price=document.createElement('p')
                p_price.classList.add('pricePlan__p')
                p_price.textContent=`$${price_yearly}/${type_period}`
                element.lastChild.appendChild(p_price)
            }else{
                const type_period=this.plan_type.periodo.mo.acronym;
                const price_monthly=price;
                const p_price=document.createElement('p')
                p_price.classList.add('pricePlan__p')
                p_price.textContent=`$${price_monthly}/${type_period}`
                element.lastChild.appendChild(p_price)
            }
        })
    }
    buttonChangePlan(tar){
        this.info_user.type_plan=tar.checked;
        this.changeUIButtonChangePlan();
        this.changePriceTypePlan();
    }
    choseTypePlan(tar){
        const type_plan=tar.querySelector('.stage2Card__info').firstChild.textContent;
        const plan_list=document.querySelectorAll('.stage2Card');
        this.plan_type.type_plan.forEach((plan,index)=>{
            if(plan.tipo===type_plan.toLowerCase()){
                plan.select=true;
                plan_list[index].classList.add('choosePlan')
            }else{
                if(plan.select!==false){
                    plan.select=false;
                    plan_list[index].classList.remove('choosePlan')
                }
            }
        })
    }
    changeListener(tar){
        switch(tar.dataset.key){
            case 'name_user':
                this.info_user.name_user=tar.value
                break
            case 'email_user':
                this.info_user.email_user=tar.value
                break
            case 'phone_user':
                this.info_user.phone_user=tar.value
                break
            case 'btn-plan':
                this.buttonChangePlan(tar)
                break
            case 'plan_type':
                this.choseTypePlan(tar)
                break
        }
    }
    stage1(){
        const divContent=document.createElement('div')
        divContent.classList.add('stage')

        const divTitle=document.createElement('div')
        divTitle.classList.add('title')
        const h2=document.createElement('h2')
        h2.textContent='Personal info'
        const p=document.createElement('p')
        p.textContent='Please provide your name,email,address, and phone number'
        divTitle.append(h2,p)

        const divForm=document.createElement('div')
        divForm.classList.add('stage1__form')

        const label1=document.createElement('label')
        label1.textContent='Name'
        const input1=document.createElement('input')
        input1.setAttribute("type","text")
        input1.value=this.info_user.name_user
        input1.setAttribute('data-key',`${Object.keys(this.info_user)[0]}`)

        const label2=document.createElement('label')
        label2.textContent='Email Address'
        const input2=document.createElement('input')
        input2.setAttribute("type","email")
        input2.value=this.info_user.email_user
        input2.setAttribute('data-key',`${Object.keys(this.info_user)[1]}`)

        const label3=document.createElement('label')
        label3.textContent='Phone Number'
        const input3=document.createElement('input')
        input3.setAttribute("type","tel")
        input3.value=this.info_user.phone_user
        input3.setAttribute('data-key',`${Object.keys(this.info_user)[2]}`)

    
        divForm.append(label1,input1,label2,input2,label3,input3)


        divContent.append(divTitle,divForm)
        document.querySelector('.stageContent__contenido').appendChild(divContent)
    }
    stage2(){
        const divContent=document.createElement('div')
        divContent.classList.add('stage')

        const divTitle=document.createElement('div')
        divTitle.classList.add('title')
        const h2=document.createElement('h2')
        h2.textContent='Select your plan'
        const p=document.createElement('p')
        p.textContent='You have the option of monthly or yearly billing.'
        divTitle.append(h2,p)

        const divPlan=document.createElement('div')
        divPlan.classList.add('stage')

        this.plan_type.type_plan.map(plan=>{
            const divPlanContent=document.createElement('div')
            divPlanContent.classList.add('stage2Card')
            if(plan.select===true)divPlanContent.classList.add('choosePlan')
            divPlanContent.setAttribute('data-key','plan_type')

            const imgPlan=document.createElement('img')
            imgPlan.setAttribute('src',`/assets/images/${plan.img}`)

            const infoPlan=document.createElement('div')
            infoPlan.classList.add('stage2Card__info')
            const namePlan=document.createElement('p')
            namePlan.textContent=`${plan.tipo.charAt(0).toUpperCase() + plan.tipo.slice(1)}`
            const pricePlan=document.createElement('div')
            pricePlan.classList.add('pricePlan')
            infoPlan.append(namePlan,pricePlan)

            divPlanContent.append(imgPlan,infoPlan)
            divPlan.append(divPlanContent)
        })

        const divButon=document.createElement('div')
        divButon.classList.add('buttonPlan')
        
        const pMonthly=document.createElement('p')
        pMonthly.classList.add('buttonPlan__pPlan')
        pMonthly.classList.add('changeColor')
        const monthlyName=this.plan_type.periodo.mo.name;
        pMonthly.textContent=`${monthlyName.charAt(0).toUpperCase() + monthlyName.slice(1)}`
        const pYearly=document.createElement('p')
        const yearlyName=this.plan_type.periodo.yr.name
        pYearly.textContent=`${yearlyName.charAt(0).toUpperCase() + yearlyName.slice(1)}`
        pYearly.classList.add('buttonPlan__pPlan')

        const buttonLabel=document.createElement('label')
        buttonLabel.classList.add('switch')
        const inputLabel=document.createElement('input')
        inputLabel.setAttribute('type','checkbox')
        inputLabel.setAttribute('data-key','btn-plan')
        if(this.info_user.type_plan===true)inputLabel.checked=true
        const spanLabel=document.createElement('span')
        spanLabel.classList.add('slider')
        spanLabel.classList.add('round')

        buttonLabel.append(inputLabel,spanLabel)
        divButon.append(pMonthly,buttonLabel,pYearly)

        divContent.append(divTitle,divPlan,divButon)

        document.querySelector('.stageContent__contenido').appendChild(divContent)
        this.changePriceTypePlan()
    }
}

const stageForm = new StageForm({
    nodoButtons:divButtons,
    nodoContent:divContent
})

stageForm.startStageForm()

function rightClick(){
    stageForm.nextButtonFunction()
}

function leftClick(){
    stageForm.backButtonFunction()
}

divContent.addEventListener('change',function(e){
    stageForm.changeListener(e.target)
})
divContent.addEventListener('click',function(e){
    stageForm.changeListener(e.target)
})
const rightButton=document.querySelector('.--right-button')
const leftButton=document.querySelector('.--left-button')
rightButton.addEventListener('click',rightClick)
leftButton.addEventListener('click',leftClick)


