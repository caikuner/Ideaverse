// 实现红绿灯，交替 1S 点亮。

class TrafficLight {
  constructor() {
    this.light = null;
    // this.render(); 
    this.run();
  }

  // render() {
  //   document.body.innerHTML = `
  //     <div id="traffic-light" style="
  //       width: 100px;
  //       height: 300px;
  //       background: #333;
  //       border-radius: 10px;
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: space-around;
  //       align-items: center;
  //       padding: 10px;
  //     ">
  //       <div id="red" style="
  //         width: 80px;
  //         height: 80px;
  //         border-radius: 50%;
  //         background: #555;
  //       "></div>
  //       <div id="yellow" style="
  //         width: 80px;
  //         height: 80px;
  //         border-radius: 50%;
  //         background: #555;
  //       "></div>
  //       <div id="green" style="
  //         width: 80px;
  //         height: 80px;
  //         border-radius: 50%;
  //         background: #555;
  //       "></div>
  //     </div>
  //   `;
  // }

  // renderLight() {
  //   // 先全部熄灭
  //   document.getElementById('red').style.background = '#555';
  //   document.getElementById('yellow').style.background = '#555';
  //   document.getElementById('green').style.background = '#555';
    
  //   // 点亮当前灯
  //   document.getElementById(color).style.background = color;
  // }

  // 如果不要渲染逻辑只需要实现下面的：
  
  async run() {
    while (true) {
      await this.changeLight('red', 1000);
      await this.changeLight('green', 1000);
      await this.changeLight('yellow', 1000);
    }
  }

  changeLight(color, duration) {
    this.color = color;
    console.log(color)
    // this.renderLight(color);
  
    // 返回一个Promise，在指定时间后resolve
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }
}

// 启动红绿灯
new TrafficLight();
