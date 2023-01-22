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
                    name:'monthly',
                    short_name:'month'
                },
                yr:{
                    acronym:'yr',
                    name:'annually',
                    short_name:'year'
                }
            },
            type_plan:[
                {
                    id:1,
                    tipo:'arcade',
                    price:9,
                    img:'icon-arcade.svg',
                    select:false
                },
                {
                    id:2,
                    tipo:'advanced',
                    price:12,
                    img:'icon-advanced.svg',
                    select:false
                },
                {
                    id:3,
                    tipo:'pro',
                    price:15,
                    img:'icon-pro.svg',
                    select:false
                }
            ],
            extra_plan:[
                {
                    id:1,
                    tipo:'Online service',
                    description:'Access to multiplayer games',
                    price:1,
                    select:false
                },
                {
                    id:2,
                    tipo:'Larger storage',
                    description:'Extra 1TB of cloud save',
                    price:2,
                    select:false
                },
                {
                    id:3,
                    tipo:'Customizable profile',
                    description:'Custom theme on your profile',
                    price:2,
                    select:false
                }
            ]
        };
        this.info_user={
            name_user:'',
            email_user:'',
            phone_user:'',
            type_plan:false,
            total_pay:0
        };
        this.nodoButtons=nodoButtons;
        this.nodoContent=nodoContent;
    }
    startStageForm(){
        this.loadStepButtons()
        this.LoadBasicStructureBoxContent()
        this.CallingMainMethods()
    }
    loadStepButtons(){
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
    InteractionNextBackButtons(){
        const leftButton=document.querySelector('.--left-button')
        const rightButton=document.querySelector('.--right-button')
        const buttonsDiv=document.querySelector('.stageContent__botones')

        if(this.currentStep!==1){
            leftButton.classList.add('show')
        }else{
            leftButton.classList.remove('show')
        }
        if(this.currentStep!==4){
            rightButton.textContent=`Next Step`
            rightButton.classList.remove('colorConfirm')
        }else{
            rightButton.textContent=`Confirm`
            rightButton.classList.add('colorConfirm')
        }
        if(this.currentStep===5){
            buttonsDiv.classList.add('none')

        }
    }
    CallingMainMethods(){
        this.ChangeColorStepButtons()
        this.InteractionNextBackButtons()
        this.StageContent()
    }
    ChangeColorStepButtons(){
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
        
    }
    nextButtonFunction(){
        if(this.currentStep<this.stageButton.length){
            this.currentStep+=1
            this.CallingMainMethods()
        }else{
            this.currentStep=this.stageButton.length+1
            this.CallingMainMethods()
        }

    }
    backButtonFunction(){
        if(this.currentStep<=this.stageButton.length){
            this.currentStep-=1
            this.CallingMainMethods()
        }

    }
    LoadBasicStructureBoxContent(){
        const divContent=document.createElement('div')
        divContent.classList.add('stageContent')

        //Box that will containt content of each stage 
        const content=document.createElement('div')
        content.classList.add('stageContent__contenido')
        content.onclick=(e)=>this.ListenerChanel(e.target)
        content.onchange=(e)=>this.ListenerChanel(e.target)

        //Buttons
        const botones=document.createElement('div')
        botones.classList.add('stageContent__botones')

        const backButton=document.createElement('button')
        backButton.textContent='Go Back'
        backButton.classList.add('--left-button')
        backButton.onclick=()=>this.backButtonFunction()
        
        const nextButton=document.createElement('button')
        nextButton.classList.add('--right-button')
        nextButton.onclick=()=>this.nextButtonFunction()

        botones.append(backButton,nextButton)

        divContent.append(content,botones)
        this.nodoContent.appendChild(divContent)
    }
    Clear(){
        const divContent=document.querySelector('.stageContent__contenido')
        divContent.innerHTML=''
    }
    StageContent(){
        this.Clear()
        switch(this.currentStep){
            case 1:
                this.Stage1()
                break
            case 2:
                this.Stage2()
                break
            case 3:
                this.Stage3()
                break
            case 4:
                this.Stage4()
                break
            case 5:
                this.Stage5()
                break
            default:
                return
        }
    }
    Stage2ChangeButtonToggleText(){
        if(this.info_user.type_plan!==true){
            const btnChangePlan=document.querySelector('.buttonPlan');
            const pChildF= btnChangePlan.firstChild;
            pChildF.classList.add('changeColor')
            const pChildL=btnChangePlan.lastChild;
            pChildL.classList.remove('changeColor')
        }else{
            const btnChangePlan=document.querySelector('.buttonPlan');
            const pChildF= btnChangePlan.firstChild;
            pChildF.classList.remove('changeColor')
            const pChildL=btnChangePlan.lastChild;
            pChildL.classList.add('changeColor')

        }
    }
    Stage2ChangePriceTypePlan(){
        const stageTypePlan=document.querySelectorAll('.stage2Card__info')
        stageTypePlan.forEach(element=>{
            const plan=this.plan_type.type_plan.find(plan=>plan.id===parseInt(element.dataset.plan));
            const price=plan.price;
            element.lastChild.innerHTML='';

            if(this.info_user.type_plan){
                const type_period=this.plan_type.periodo.yr.acronym;
                const price_yearly=(price*12);
                const p_price=document.createElement('p')
                p_price.setAttribute('data-key','plan_type')
                p_price.setAttribute('data-plan',`${plan.id}`)
                p_price.classList.add('pricePlan__p')
                p_price.textContent=`$${price_yearly}/${type_period}`
                element.lastChild.appendChild(p_price)
            }else{
                const type_period=this.plan_type.periodo.mo.acronym;
                const price_monthly=price;
                const p_price=document.createElement('p')
                p_price.setAttribute('data-key','plan_type')
                p_price.setAttribute('data-plan',`${plan.id}`)
                p_price.classList.add('pricePlan__p')
                p_price.textContent=`$${price_monthly}/${type_period}`
                element.lastChild.appendChild(p_price)
            }
        })
    }
    Stage2ButtonToggleChangeTypePlan(tar){
        this.info_user.type_plan=tar.checked;
        this.Stage2ChangeButtonToggleText();
        this.Stage2ChangePriceTypePlan();
    }
    Stage2ChooseTypePlan(tar){
        const type_plan=parseInt(tar.dataset.plan);
        const plan_list=document.querySelectorAll('.stage2Card');
        this.plan_type.type_plan.forEach((plan,index)=>{
            if(plan.id===type_plan){
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
    Step3chooseExtraPlan(tar){
        const extraPlanElement=document.querySelectorAll('.extraPlan')
        if(tar.checked){
            const indexPlan=this.plan_type.extra_plan.findIndex(plan=>plan.id===parseInt(tar.dataset.key));
            this.plan_type.extra_plan[indexPlan].select=true;
            extraPlanElement[indexPlan].classList.add('choosePlan');
        }else{
            const indexPlan=this.plan_type.extra_plan.findIndex(plan=>plan.id===parseInt(tar.dataset.key));
            if(this.plan_type.extra_plan[indexPlan].select===true){
                this.plan_type.extra_plan[indexPlan].select=false;
                extraPlanElement[indexPlan].classList.remove('choosePlan');
            }
        }

    }
    ListenerChanel(tar){
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
                this.Stage2ButtonToggleChangeTypePlan(tar)
                break
            case 'plan_type':
                this.Stage2ChooseTypePlan(tar)
                break
            case '1':
                this.Step3chooseExtraPlan(tar)
                break
            case '2':
                this.Step3chooseExtraPlan(tar)
                break
            case '3':
                this.Step3chooseExtraPlan(tar)
                break
            default:
                return
        }
    }
    Stage4FunctionClickChangePlan(){
        this.currentStep=2
        this.CallingMainMethods()
    }
    Stage1(){
        const divContent=document.createElement('div')
        divContent.classList.add('stage')

        const divTitle=document.createElement('div')
        divTitle.classList.add('title')
        const h2=document.createElement('h2')
        h2.textContent='Personal info'
        const p=document.createElement('p')
        p.textContent='Please provide your name, email, address, and phone number'
        divTitle.append(h2,p)

        const divForm=document.createElement('div')
        divForm.classList.add('stage1__form')

        const label1=document.createElement('label')
        label1.textContent='Name'
        const input1=document.createElement('input')
        input1.setAttribute("type","text")
        input1.setAttribute('placeholder','e.g.Stephen King')
        input1.setAttribute('data-key',`${Object.keys(this.info_user)[0]}`)
        input1.value=this.info_user.name_user

        const label2=document.createElement('label')
        label2.textContent='Email Address'
        const input2=document.createElement('input')
        input2.setAttribute("type","email")
        input2.setAttribute('placeholder','e.g.stephenking@lorem.co')
        input2.setAttribute('data-key',`${Object.keys(this.info_user)[1]}`)
        input2.value=this.info_user.email_user

        const label3=document.createElement('label')
        label3.textContent='Phone Number'
        const input3=document.createElement('input')
        input3.setAttribute("type","tel")
        input3.setAttribute('placeholder','e.g.+ 1 234 567 890')
        input3.setAttribute('data-key',`${Object.keys(this.info_user)[2]}`)
        input3.value=this.info_user.phone_user

    
        divForm.append(label1,input1,label2,input2,label3,input3)


        divContent.append(divTitle,divForm)
        document.querySelector('.stageContent__contenido').appendChild(divContent)
    }
    Stage2(){
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
        divPlan.classList.add('rowCards')

        this.plan_type.type_plan.map(plan=>{
            const divPlanContent=document.createElement('div')
            divPlanContent.classList.add('stage2Card')
            if(plan.select===true)divPlanContent.classList.add('choosePlan')
            divPlanContent.setAttribute('data-key','plan_type')
            divPlanContent.setAttribute('data-plan',`${plan.id}`)

            const imgPlan=document.createElement('img')
            imgPlan.setAttribute('src',`./assets/images/${plan.img}`)
            imgPlan.setAttribute('data-key','plan_type')
            imgPlan.setAttribute('data-plan',`${plan.id}`)

            const infoPlan=document.createElement('div')
            infoPlan.classList.add('stage2Card__info')
            infoPlan.setAttribute('data-key','plan_type')
            infoPlan.setAttribute('data-plan',`${plan.id}`)

            const namePlan=document.createElement('p')
            namePlan.textContent=`${plan.tipo.charAt(0).toUpperCase() + plan.tipo.slice(1)}`
            namePlan.setAttribute('data-plan',`${plan.id}`)
            namePlan.setAttribute('data-key','plan_type')

            const pricePlan=document.createElement('div')
            pricePlan.setAttribute('data-plan',`${plan.id}`)
            pricePlan.setAttribute('data-key','plan_type')
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
        this.Stage2ChangePriceTypePlan()
    }
    Stage3(){
        const divContent=document.createElement('div')
        divContent.classList.add('stage')

        const divTitle=document.createElement('div')
        divTitle.classList.add('title')
        const h2=document.createElement('h2')
        h2.textContent='Pick add-ons'
        const p=document.createElement('p')
        p.textContent='Add-ons help enhance your gaming experience.'
        divTitle.append(h2,p) 

        const divPlan=document.createElement('div')
        divPlan.classList.add('stage')

        this.plan_type.extra_plan.map(plan=>{
            const divContenido=document.createElement('div')
            divContenido.classList.add('extraPlan')

            const divInput=document.createElement('div')
            divInput.classList.add('inputPlan')
            const inputCheckbox=document.createElement('input')
            inputCheckbox.setAttribute('type','checkbox')
            if(plan.select===true){
                divContenido.classList.add('choosePlan');
                inputCheckbox.checked=true;   
            }
            inputCheckbox.setAttribute('data-key',`${plan.id}`)
            divInput.appendChild(inputCheckbox)

            const divInfor=document.createElement('div')
            divInfor.classList.add('infoPlan')

            const p_title=document.createElement('p')
            p_title.textContent=`${plan.tipo}`
            const p_info=document.createElement('p')
            p_info.textContent=`${plan.description}`

            divInfor.append(p_title,p_info)

            let precio;
            let tipo;
            if(this.info_user.type_plan!==false){
                precio=plan.price*12;
                tipo=this.plan_type.periodo.yr.acronym;
            }else{
                precio=plan.price;
                tipo=this.plan_type.periodo.mo.acronym;
            }

            const divPrecio=document.createElement('div')
            divPrecio.classList.add('precioPlan')
            const p_precio=document.createElement('p')
            p_precio.textContent=`+$${precio}/${tipo}`
            divPrecio.appendChild(p_precio)

            divContenido.append(divInput,divInfor,divPrecio)
            divPlan.appendChild(divContenido)
        });

        divContent.append(divTitle,divPlan)
        document.querySelector('.stageContent__contenido').appendChild(divContent)
    }
    Stage4(){
        const divContent=document.createElement('div')
        divContent.classList.add('stage')

        const divTitle=document.createElement('div')
        divTitle.classList.add('title')
        const h2=document.createElement('h2')
        h2.textContent='Finishing up'
        const p=document.createElement('p')
        p.textContent='Double-check everything looks OK before confirming.'
        divTitle.append(h2,p) 

        const divPlan=document.createElement('div')
        divPlan.classList.add('stage')

        const planUser=document.createElement('div')
        planUser.classList.add('planUser')

        let totalPay=0;
        this.plan_type.type_plan
            .filter(plan=>plan.select===true)
            .forEach(plan=>{
                totalPay+=plan.price;
                let price=plan.price;
                let type_period=this.plan_type.periodo.mo.name;
                let acro_period=this.plan_type.periodo.mo.acronym;
                if(this.info_user.type_plan!==false){
                    price=plan.price*12;
                    type_period=this.plan_type.periodo.yr.name;
                    acro_period=this.plan_type.periodo.yr.acronym;
                }
                const divMainPlan=document.createElement('div')
                divMainPlan.classList.add('mainPay')

                const divInfor=document.createElement('div')
                const p1=document.createElement('p')
                p1.textContent=`${plan.tipo.charAt(0).toUpperCase() + plan.tipo.slice(1)} (${type_period.charAt(0).toUpperCase() + type_period.slice(1)})`
                const p2=document.createElement('p')
                p2.textContent=`Change`
                p2.classList.add('mainPay__info')
                p2.onclick=()=>this.Stage4FunctionClickChangePlan()
                divInfor.append(p1,p2)

                const priceMainPlan=document.createElement('p')
                priceMainPlan.textContent=`$${price}/${acro_period}`

                divMainPlan.append(divInfor,priceMainPlan)
                planUser.append(divMainPlan)
            })
        this.plan_type.extra_plan
            .filter(plan=>plan.select===true)
            .forEach(plan=>{
                totalPay+=plan.price;
                let price=plan.price;
                let acro_period=this.plan_type.periodo.mo.acronym;
                if(this.info_user.type_plan!==false){
                    price=plan.price*12;
                    acro_period=this.plan_type.periodo.yr.acronym;
                }
                const divMainPlan=document.createElement('div')
                divMainPlan.classList.add('extraPay')


                const divInfor=document.createElement('p')
                divInfor.classList.add('extraPay__p1')
                divInfor.textContent=`${plan.tipo.charAt(0).toUpperCase() + plan.tipo.slice(1)}`

                const priceMainPlan=document.createElement('p')
                priceMainPlan.classList.add('extraPlan__p2')
                priceMainPlan.textContent=`+$${price}/${acro_period}`

                divMainPlan.append(divInfor,priceMainPlan)
                planUser.append(divMainPlan)
            })
        divPlan.append(planUser)

        const divtotalPay=document.createElement('div')
        divtotalPay.classList.add('totalPay')
        const p1=document.createElement('p')
        p1.classList.add('totalPay__p1')
        let type_period_pay=this.plan_type.periodo.mo.short_name;
        let acro_period=this.plan_type.periodo.mo.acronym;
        if(this.info_user.type_plan!==false){
            type_period_pay=this.plan_type.periodo.yr.short_name;
            acro_period=this.plan_type.periodo.yr.acronym;
            totalPay*=12
        }
        //Aqui guardamos la informacion del precio de compra total
        this.info_user.total_pay=totalPay

        p1.textContent=`Total (per ${type_period_pay})`
        const p2=document.createElement('p')
        p2.classList.add('totalPay__p2')
        p2.textContent=`+$${totalPay}/${acro_period}`
        divtotalPay.append(p1,p2)


        divContent.append(divTitle,divPlan,divtotalPay)
        document.querySelector('.stageContent__contenido').appendChild(divContent)
    }
    Stage5(){
        const divContainer=document.createElement('div')
        divContainer.classList.add('stage5')
        const imgStage5=document.createElement('img');
        imgStage5.setAttribute('src',`./assets/images/icon-thank-you.svg`)

        const title=document.createElement('h1')
        title.textContent=`Thank you!`

        const info=document.createElement('p')
        info.textContent=`Thanks for confirming your subscription ! We hope you have fun using our plataform. If you ever need support,please feel free to email us at support@loremgaming.com`

        divContainer.append(imgStage5,title,info)
        document.querySelector('.stageContent__contenido').appendChild(divContainer)

        //active color step buttons in number four
        this.currentStep=4
        this.ChangeColorStepButtons()
    }
}

const divContent=document.querySelector(".main-block__contenido");
const divButtons=document.querySelector(".main-block__button");

const stageForm = new StageForm({
    nodoButtons:divButtons,
    nodoContent:divContent
})

stageForm.startStageForm()


