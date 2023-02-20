import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      showFullItem: false,
      fullItem: {},
      items: [
{
  id:1,
  title: "MasterLiquid ML120L V2 RGB",
  img: "masterliquid-ml120l-v2-rgb-380x380-2-hover.png",
  description: "Новая конструкция насоса с модернизированными внутренними компонентами повышает надежность и увеличивает срок службы. В усиленном уплотнении используется EPDM промышленного класса для предотвращения утечек.",
  category:'liquidcoolers',
  price: 1000,
},
{
  id:2,
  title: "MasterLiquid ML240L V2 RGB",
  img: "masterliquid-ml240l-v2-rgb-380x380-2-hover.png",
  description: "Новая конструкция насоса с модернизированными внутренними компонентами повышает надежность и увеличивает срок службы. В усиленном уплотнении используется EPDM промышленного класса для предотвращения утечек.",
  category:'liquidcoolers',
  price: 500,
},
{
  id:3,
  title: "MasterFan SF240R ARGB ",
  img: "sf240r-380x380-2-hover.png",
  description: "MasterFan SF240R ARGB, новый вентилятор SF, завершающий серию MasterFan SF, представляет собой специальное решение для воздушного охлаждения, идеально подходящее для ваших кулеров и вентиляторов на входе в корпус. Квадратная рама предназначена для максимального охвата площади и создания потока воздуха под высоким давлением. Звукопоглощающая прорезиненная прокладка вместе с установленным бесшумным драйвером IC для плавного вращения вентилятора, который уменьшает вибрацию и щелчки вентилятора. SF240R ARGB совместим с ПК с адресной RGB-подсветкой, вы можете почувствовать поток с полным цветовым весельем и идеально соответствовать теме вашего ПК.",
  category:'coolers',
  price: 200,
},
{
  id:4,
  title: "MOBIUS 120P ARGB ",
  img: "mobius-120p-argb-380x380-2-hover.png",
  description: "Mobius 120P ARGB от Cooler Master — это наша новая серия высокопроизводительных вентиляторов. Благодаря нашему усовершенствованному дизайну Ring Blade серия Mobius оптимизирует как производительность, так и акустику, удовлетворяя динамический диапазон приложений от корпуса, жидкости или воздуха до разгона и интенсивных игр.",
  category:'coolers',
  price: 100,
},
      ]
    }
    this.state.currentItems=this.state.items
    //говорим что в  методе addToOrder мы можем работать с состоянием
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render() {
    return (
  <div className="wrapper">
<Header orders={this.state.orders} onDelete={this.deleteOrder} />
<Categories chooseCategory={this.chooseCategory} />
<Items items={this.state.currentItems} onAdd={this.addToOrder} onShowItem={this.onShowItem} />
{this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem}  item={this.state.fullItem} />}
<Footer />

  </div>
    )
  }

onShowItem(item) {
  this.setState({fullItem: item});
  this.setState({showFullItem: !this.state.showFullItem})
}



chooseCategory(category) {
  if(category==='all') {
    this.setState({currentItems:this.state.items})
    return
   }
this.setState({
  currentItems:this.state.items.filter(el=>el.category===category)


}) 

 }

deleteOrder(id) {
  this.setState({
    orders: this.state.orders.filter(el => el.id!== id)})
   
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach(el=>{
      if(el.id === item.id)
      isInArray =true  
    })
    if(!isInArray)
this.setState({orders: [...this.state.orders, item] }
  
 /*вывести товар по нажатию кнопки ,() =>{
   console.log(this.state.orders)
  }*/
  )

  }
}


export default App;
