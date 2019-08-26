<template>
  <div id="main-page">
    <div v-for="(value,index) of topTitleList">
      <div class="around-container">
        <div class="goods-top clearfix">
          <h3 class="top-title">{{value}}</h3>
          <ul class="top-sub">
            <li v-for="sub in subsList[index]"
                :class="{'active': topSubStatus === sub.key}"
                @mouseenter="topSubEnter(index, sub.key)">{{sub.name}}
            </li>
          </ul>
        </div>
        <div class="goods-content clearfix">
          <goods-left :left-goods="leftGoodsList[index]"/>
          <goods-right :curr-goods="currGoods[index]"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import GoodsTop from './GoodsTop'
  import GoodsLeft from './GoodsLeft'
  import GoodsRight from './GoodsRight'
  import { IndexGoodsQryAction } from '../api/RequestIndex'

  export default {
    data () {
      return {
        // topTitleList: ['家电', '智能', '搭配', '配件', '周边'],
        // subsList: [
        //   [
        //     { name: '热门', key: 'hotGoods' },
        //     { name: '电视影音', key: 'tv' },
        //     { name: '电脑', key: 'computer' },
        //     { name: '家居', key: 'home' }
        //   ], [
        //     { name: '热门', key: 'hotGoods' },
        //     { name: '出行', key: 'outdoor' },
        //     { name: '健康', key: 'health' },
        //     { name: '酷玩', key: 'play' },
        //     { name: '路由器', key: 'router' }
        //   ]
        //   , [
        //     { name: '热门', key: 'hotGoods' },
        //     { name: '耳机音箱', key: 'headset' },
        //     { name: '电源', key: 'power' },
        //     { name: '电池存储卡', key: 'card' }
        //   ]
        //   , [
        //     { name: '热门', key: 'hotGoods' },
        //     { name: '保护套', key: 'cover' },
        //     { name: '贴膜', key: 'pasting' },
        //     { name: '其他配件', key: 'others' }
        //   ], [
        //     { name: '热门', key: 'hotGoods' },
        //     { name: '服装', key: 'dress' },
        //     { name: '米兔', key: 'rabbit' },
        //     { name: '生活周边', key: 'around' },
        //     { name: '箱包', key: 'bags' }
        //   ]
        // ],
        // leftGoodsList: [
        //   [
        //     { link: 'https://www.mi.com/air2/', imgUrl: './static/imgs/xmjhq2.jpg' }
        //   ],
        //   [
        //     { link: 'http://www.mi.com/roomrobot/', imgUrl: './static/imgs/mjsdjqr.jpg' },
        //     { link: 'http://www.mi.com/dianfanbao2-4l/', imgUrl: './static/imgs/mjdfb4l.jpg' }
        //   ]
        //   , [
        //     { link: 'http://www.mi.com/bluetooth-audio/', imgUrl: './static/imgs/lyypjsq.jpg' },
        //     { link: 'http://www.mi.com/battery20000/', imgUrl: './static/imgs/xmyddy2.jpg' }
        //   ]
        //   , [
        //     { link: 'http://www.mi.com/mj-smartshoes/', imgUrl: './static/imgs/mjydx.jpg' },
        //     { link: 'http://item.mi.com/1154400010.html', imgUrl: './static/imgs/fhzly.jpg' }
        //   ]
        //   , [
        //     { link: 'http://www.mi.com/selfiestick-tripod/', imgUrl: './static/imgs/xmzjszpg.jpg' },
        //     { link: 'http://item.mi.com/1164700015.html', imgUrl: './static/imgs/zshmj.jpg' }
        //   ]
        // ],
        // rightGoodsList: [
        //   {
        //     hotGoods: [
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xm4a.png',
        //         title: '小米电视4A 49英寸',
        //         price: '2299',
        //         oldPrice: '2599',
        //         discountType: 'discount',
        //         discount: '享九折',
        //         heat: '7.1-7.31 直降300',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/buy/mitv4a-43',
        //         imgUrl: './static/imgs/xmds4a43.png',
        //         title: '小米电视4A 43英寸',
        //         price: '2099',
        //         heat: '2GB+8GB 真四核64位高性能处理器',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmbjb13.3.jpg',
        //         title: '小米笔记本Air 13.3英寸',
        //         price: '4999',
        //         heat: '独立显卡，全金属机身，超长续航',
        //         reviewDesc: '是买给老婆的生日礼物！我们一家在我的带领下差不多都是...',
        //         reviewAuthor: '纷飞泪',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmbjb12.5.jpg',
        //         title: '小米笔记本Air 12.5英寸',
        //         price: '3599',
        //         heat: '集成显卡，全金属机身，超长续航',
        //         reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...',
        //         reviewAuthor: '在路上',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/electric-toothbrush/',
        //         imgUrl: './static/imgs/ddys.jpg',
        //         title: '米家声波电动牙刷',
        //         price: '199',
        //         discountType: 'new',
        //         discount: '新品',
        //         heat: '磁悬浮声波马达，定制多种刷牙模式',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://www.mi.com/dianfanbao/',
        //         imgUrl: './static/imgs/mjdfb.jpg',
        //         title: '米家压力IH电饭煲',
        //         price: '999',
        //         heat: '智能烹饪，灰铸铁粉体涂层内胆',
        //         reviewDesc: '中国人终于可以不要到国外去买电饭煲了！坐在家里点点手...',
        //         reviewAuthor: '姚士祥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/yeelight-ceilinglamp/',
        //         imgUrl: './static/imgs/mjled.png',
        //         title: 'Yeelight LED 吸顶灯',
        //         price: '379',
        //         heat: '5分钟快装，月光夜灯，IP60 级防尘',
        //         reviewDesc: '可以改变色温，光暗，有一键夜灯，功能强大。本来不懂磁...',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/mjsd.jpg',
        //         title: '米家扫地机器人',
        //         price: '1699',
        //         heat: '热门',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     tv: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmds3s-55.jpg',
        //         title: '小米电视3s 55英寸',
        //         price: '3599',
        //         oldPrice: '3999',
        //         discountType: 'discount',
        //         discount: '享九折',
        //         heat: '7月11日-7月14日立减400元',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmds4a-65.png',
        //         title: '电视4A 65英寸标准版',
        //         price: '4699',
        //         oldPrice: '5699',
        //         discountType: 'discount',
        //         discount: '享九折',
        //         heat: '7月11日-7月14日立减1000元',
        //         reviewDesc: '超大的，就是厚了一点。运费安装费有点贵。',
        //         reviewAuthor: '假の太逼真',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmds4a-49.png',
        //         title: '电视4A 49英寸 人工智能语音版',
        //         price: '2899',
        //         heat: '7月12日-7月14日立减400元',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmds4a-55.png',
        //         title: '电视4A 55英寸 人工智能语音版',
        //         price: '3599',
        //         heat: '7月12日-7月14日立减400元',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmds4a-65.png',
        //         title: '电视4A 65英寸 人工智能语音版',
        //         price: '6199',
        //         heat: '7月12日-7月14日立减1000元',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmds4a-55.png',
        //         title: '电视4A 55英寸标准版',
        //         price: '3199',
        //         heat: '7月12日-7月14日直降400元',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmhz3s.jpg',
        //         title: '小米盒子3s',
        //         price: '299',
        //         heat: '4K超高清机顶盒，64 位处理器',
        //         reviewDesc: '小目标又实现一小步，大目标是两年内把客服MM都买到我...',
        //         reviewAuthor: '我本疯狂',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/hz3.jpg',
        //         title: '盒子3 增强版',
        //         price: '399',
        //         heat: '电视影音',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     computer: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmbijb13.3.jpg',
        //         title: '小米笔记本Air13.3英寸',
        //         price: '5499',
        //         heat: '第7代CPU 2G独显 指纹解锁',
        //         reviewDesc: '特别好的电脑！硬盘，office2016增强版已安装...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmbjb12.5.jpg',
        //         title: '小米笔记本Air 12.5英寸',
        //         price: '4999',
        //         discountType: 'new',
        //         discount: '新品',
        //         heat: '集成显卡，酷睿 i5处理器',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmbjb12.5.jpg',
        //         title: '小米笔记本Air 12.5英寸',
        //         price: '3999',
        //         heat: '更轻更薄，像杂志一样随身携带',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmbjbbao.jpg',
        //         title: '小米笔记本内胆包12.5英寸',
        //         price: '99',
        //         heat: '至简纤薄 轻松随行无压力',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmwxsb.png',
        //         title: '小米无线鼠标',
        //         price: '69',
        //         heat: '耐脏亲肤涂层，人体工学设计',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmbxsb.jpg',
        //         title: '小米便携鼠标',
        //         price: '99',
        //         heat: '轻薄便携，铝合金外壳 +ABS 材质',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmymjp.png',
        //         title: '悦米机械键盘',
        //         price: '279',
        //         oldPrice: '289',
        //         discountType: 'discount',
        //         discount: '享9.7折',
        //         heat: '铝合金机身，TTC红轴，87 键',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/usbc-zjq.jpg',
        //         title: 'USB-C至HDMI多功能转接器',
        //         price: '149',
        //         heat: '电脑',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     home: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjdfb.jpg',
        //         title: '米家IH电饭煲 3L',
        //         price: '399',
        //         heat: 'IH 电磁环绕加热，3000+ 煮米方案',
        //         reviewDesc: '电饭煲很精巧，外观高大上，煮饭香又香。客服妹子，我叫...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/ddys.jpg',
        //         title: '米家声波电动牙刷',
        //         price: '199',
        //         discountType: 'new',
        //         discount: '新品',
        //         heat: '磁悬浮声波马达，定制多种刷牙模式',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmjsq.jpg',
        //         title: '小米净水器（厨下式）',
        //         price: '1999',
        //         heat: 'RO反渗透直出纯净水，隐藏安装',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjkqjhq.png',
        //         title: '米家空气净化器Pro',
        //         price: '1499',
        //         heat: 'OLED显示屏幕，激光颗粒物传感器',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjdsh.jpg',
        //         title: '米家恒温电水壶',
        //         price: '199',
        //         heat: '水温智能控制，304 不锈钢内胆',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjqbd.jpg',
        //         title: '飞利浦智睿球泡灯',
        //         price: '49',
        //         discountType: 'new',
        //         discount: '新品',
        //         heat: '自由调节亮度，Wi-Fi随时操控',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjtd.jpg',
        //         title: '米家 LED 智能台灯',
        //         price: '169',
        //         heat: '无可视频闪，四种场景优化调光',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/mjxdd.png',
        //         title: 'Yeelight LED 吸顶灯',
        //         price: '379',
        //         heat: '家居',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ]
        //   },
        //   {
        //     hotGoods: [
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/xmtzc.jpg', title: '小米体脂秤',
        //         price: '199', heat: '简约纤薄，隐藏式 LED 显示屏',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: true},
        //       {link: 'https://item.mi.com/buy/mitv4a-43', imgUrl: './static/imgs/mjxjtc.jpg', title: '米家全景相机套装',
        //         price: '1599', oldPrice: '1699', discountType: 'discount', discount: '享9.5折', heat: '2388万有效像素，IP67级防水防尘',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/xmphc.png', title: '九号平衡车 Plus',
        //         price: '3499', discountType: 'new', discount: '新品', heat: '35km超长续航，一键自动跟随',reviewDesc: '是买给老婆的生日礼物！我们一家在我的带领下差不多都是...', reviewAuthor: '纷飞泪', reviewStatus: true},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/mjczkqjhq.jpg', title: '米家车载空气净化器',
        //         price: '420', oldPrice: '449', discountType: 'discount', discount: '享9.4折',heat: '双风机循环气流，高效净化车内空气',reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...', reviewAuthor: '在路上', reviewStatus: true},
        //       {link: 'https://www.mi.com/electric-toothbrush/', imgUrl: './static/imgs/mtjmjqr.jpg', title: '米兔积木机器人 履带机甲',
        //         price: '499', discountType: 'new', discount: '新品', heat: '履带底盘，智能操控，百变拼插',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://www.mi.com/dianfanbao/', imgUrl: './static/imgs/mtetdhsb2.jpg', title: '米兔儿童电话手表2',
        //         price: '399', discountType: 'new', discount: '新品', heat: 'AMOLED高清彩屏，6 天超长续航',reviewDesc: '中国人终于可以不要到国外去买电饭煲了！坐在家里点点手...', reviewAuthor: '姚士祥', reviewStatus: true},
        //       {link: 'https://www.mi.com/yeelight-ceilinglamp/', imgUrl: './static/imgs/xmwrjtc.jpg', title: '小米无人机4K版套装',
        //         price: '2969', oldPrice: '2999', discountType: 'discount', discount: '享9.9折', heat: '探索触手可及的新视角',reviewDesc: '可以改变色温，光暗，有一键夜灯，功能强大。本来不懂磁...', reviewAuthor: '冼伟强', reviewStatus: true},
        //       { link: 'https://www.mi.com/roomrobot/', imgUrl: './static/imgs/xmvryj.jpg', title: '小米VR眼镜',
        //         price: '299', heat: '热门',reviewDesc: '', moreUrl: 'https://www.mi.com/buytv/',reviewAuthor: '冼伟强', reviewStatus: false}
        //     ],
        //     outdoor: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjxb.jpg',
        //         title: '米家小白智能摄像机',
        //         price: '399',
        //         heat: '360° 全景拍摄，1080P 高清摄像',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/dzlztzxc.jpg',
        //         title: '电助力折叠自行车',
        //         price: '2999',
        //         heat: '力矩传感电助力，折叠便携设计',
        //         reviewDesc: '超大的，就是厚了一点。运费安装费有点贵。',
        //         reviewAuthor: '假の太逼真',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/mjdjj.jpg',
        //         title: '小米米家对讲机',
        //         price: '249',
        //         heat: '限时特惠，满2件减40元',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmphc.jpg',
        //         title: '九号平衡车',
        //         price: '1999',
        //         heat: '年轻人的酷玩具，骑行遥控两种玩法',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmydsb.jpg',
        //         title: 'Amazfit 运动手表',
        //         price: '799',
        //         heat: '蓝牙听歌，运动心率，智能通知提醒',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xywd.jpg',
        //         title: '小蚁微单相机M1双镜头套机',
        //         price: '2999',
        //         heat: '限时特惠，下单立减100元',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmsh2.jpg',
        //         title: '小米手环2',
        //         price: '149',
        //         discountType: 'free',
        //         discount: '免邮费',
        //         heat: 'OLED 显示屏幕，升级计步算法',
        //         reviewDesc: '小目标又实现一小步，大目标是两年内把客服MM都买到我...',
        //         reviewAuthor: '我本疯狂',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/mjczkqjhqlx.jpg',
        //         title: '米家车载空气净化器滤芯',
        //         price: '59',
        //         heat: '出行',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     health: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjtd2.jpg',
        //         title: '米家飞利浦智睿台灯二代',
        //         price: '199',
        //         heat: '感知环境光，主动优化场景照明',
        //         reviewDesc: '特别好的电脑！硬盘，office2016增强版已安装...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmctd.jpg',
        //         title: 'Yeelight床头灯',
        //         price: '229',
        //         oldPrice: '249',
        //         discountType: 'discount',
        //         discount: '享9.2折',
        //         heat: '触摸式操作体验，给卧室1600万种颜色',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmtizc.jpg',
        //         title: '小米体重秤',
        //         price: '99',
        //         heat: '100克，喝杯水都可感知的精准',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjznsxj.jpg',
        //         title: '米家智能摄像机 1080P',
        //         price: '189',
        //         oldPrice: '199',
        //         discountType: 'discount',
        //         discount: '享9.5折',
        //         heat: '10米红外夜视范围，双向语音沟通',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjxyj.jpg',
        //         title: '米家iHealth血压计',
        //         price: '399',
        //         heat: '爸妈上手就会用的智能血压计',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjpmjcy.jpg',
        //         title: '米家PM2.5检测仪',
        //         price: '399',
        //         heat: '一体黑 OLED 屏，智能联动',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/kqjhqlx.jpg',
        //         title: '空气净化器滤芯',
        //         price: '149',
        //         heat: '高效净化，可吸入颗粒物、甲醛',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xmszjcb.jpg',
        //         title: '小米水质TDS检测笔',
        //         price: '39',
        //         heat: '健康',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     play: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mtetsb.jpg',
        //         title: '米兔儿童手表Q',
        //         price: '249',
        //         oldPrice: '299',
        //         discountType: 'discount',
        //         discount: '享9折',
        //         heat: '11重安全设计，五重精准定位',
        //         reviewDesc: '电饭煲很精巧，外观高大上，煮饭香又香。客服妹子，我叫...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mtzngsj.jpg',
        //         title: '米兔智能故事机',
        //         price: '199',
        //         heat: '微信远程互动，智能语音交互',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjznjttz.png',
        //         title: '米家智能家庭礼品装',
        //         price: '329',
        //         heat: '智能联动，让生活更便捷',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjdgnwg.jpg',
        //         title: '米家多功能网关',
        //         price: '149',
        //         heat: '米家智能配件控制中心',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/ywbjq.jpg',
        //         title: '烟雾报警器',
        //         price: '149',
        //         heat: '远程报警，定期自检提醒',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjzncz.jpg',
        //         title: '米家智能插座(ZigBee版)',
        //         price: '69',
        //         heat: '实际功率检测，电量统计，定时开关',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmwlsyj.jpg',
        //         title: '小米网络收音机增强版',
        //         price: '149',
        //         heat: '蓝牙 Wi-Fi 双无线，专业扬声器',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xfznsxj.jpg',
        //         title: '小方智能摄像机',
        //         price: '129',
        //         heat: '酷玩',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     router: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmlyq3.jpg',
        //         title: '小米路由器3',
        //         price: '149',
        //         discountType: 'free',
        //         discount: '免邮费',
        //         heat: '四天线设计，更快更强',
        //         reviewDesc: '电饭煲很精巧，外观高大上，煮饭香又香。客服妹子，我叫...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmlyq3c.jpg',
        //         title: '小米路由器3C',
        //         price: '99',
        //         discountType: 'free',
        //         discount: '免邮费',
        //         heat: 'APP智能控制，安全防蹭网',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmwffdq.jpg',
        //         title: '小米WiFi放大器 2',
        //         price: '49',
        //         heat: '适配主流路由器，两步完成设置',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmlyq.jpg',
        //         title: '小米路由器 HD',
        //         price: '1299',
        //         heat: '全新金属机身设计，4x4全向性天线',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmwfdlm.jpg',
        //         title: '小米WiFi电力猫',
        //         price: '249',
        //         heat: '需要与路由器产品搭配使用',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmlyqp.jpg',
        //         title: '小米路由器 Pro',
        //         price: '499',
        //         heat: '全新金属机身设计，4x4全向性天线',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmlyq3g.jpg',
        //         title: '小米路由器3G',
        //         price: '249',
        //         discountType: 'new',
        //         discount: '新品',
        //         heat: '双核全千兆设计，USB 3.0',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xmwx.jpg',
        //         title: '小米千兆网线',
        //         price: '14.9',
        //         heat: '路由器',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ]
        //   },
        //   {
        //     hotGoods: [
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/xmydlyej.jpg', title: '小米运动蓝牙耳机',
        //         price: '149', heat: '1万人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: true},
        //       {link: 'https://item.mi.com/buy/mitv4a-43', imgUrl: './static/imgs/xmyddy.jpg', title: '20000mAh小米移动电源2',
        //         price: '149', heat: '1.7万人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/yddy.jpg', title: '小米移动电源10000mAh高配版',
        //         price: '149', heat: '8206人评价',reviewDesc: '是买给老婆的生日礼物！我们一家在我的带领下差不多都是...', reviewAuthor: '纷飞泪', reviewStatus: true},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/xmhsej.jpg', title: '小米活塞耳机 清新版',
        //         price: '29',heat: '4.6万人评价',reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...', reviewAuthor: '在路上', reviewStatus: true},
        //       {link: 'https://www.mi.com/electric-toothbrush/', imgUrl: './static/imgs/xmwlyx.jpg', title: '小米网络音响',
        //         price: '349', oldPrice: '399', discountType: 'discount', discount: '享9折', heat: '6154人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://www.mi.com/dianfanbao/', imgUrl: './static/imgs/xmlyejqc.jpg', title: '小米蓝牙耳机青春版',
        //         price: '59', heat: '2.7万人评价',reviewDesc: '中国人终于可以不要到国外去买电饭煲了！坐在家里点点手...', reviewAuthor: '姚士祥', reviewStatus: true},
        //       {link: 'https://www.mi.com/yeelight-ceilinglamp/', imgUrl: './static/imgs/xmqtejp.jpg', title: '小米圈铁耳机Pro',
        //         price: '149', heat: '1.9万人评价',reviewDesc: '可以改变色温，光暗，有一键夜灯，功能强大。本来不懂磁...', reviewAuthor: '冼伟强', reviewStatus: true},
        //       { link: 'https://www.mi.com/roomrobot/', imgUrl: './static/imgs/xmxgp.jpg', title: '小米小钢炮蓝牙音箱2 白色',
        //         price: '129', heat: '热门',reviewDesc: '', moreUrl: 'https://www.mi.com/buytv/',reviewAuthor: '冼伟强', reviewStatus: false}
        //     ],
        //     headset: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmtdsqs.jpg',
        //         title: '小米头戴式耳机 轻松版',
        //         price: '199',
        //         heat: '1919人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmjlej.jpg',
        //         title: '小米胶囊耳机',
        //         price: '69',
        //         heat: '3.6万人评价',
        //         reviewDesc: '超大的，就是厚了一点。运费安装费有点贵。',
        //         reviewAuthor: '假の太逼真',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmqtp.jpg',
        //         title: '小米圈铁耳机Pro',
        //         price: '149',
        //         heat: '1.8万人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmsslyyx.jpg',
        //         title: '小米随身蓝牙音箱',
        //         price: '69',
        //         heat: '1.9万人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmxgply.jpg',
        //         title: '小米小钢炮蓝牙音箱2',
        //         price: '129',
        //         heat: '2.7万人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmfhz.jpg',
        //         title: '小米方盒子蓝牙音箱2',
        //         price: '129',
        //         heat: '1305人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmyyly.jpg',
        //         title: 'ROIDMI音乐蓝牙车充',
        //         price: '99',
        //         heat: '1880人评价',
        //         reviewDesc: '小目标又实现一小步，大目标是两年内把客服MM都买到我...',
        //         reviewAuthor: '我本疯狂',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xmlyyx.jpg',
        //         title: '小米蓝牙音箱',
        //         price: '189',
        //         heat: '耳机音箱',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     power: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/yddy5000.jpg',
        //         title: '移动电源5000mAh',
        //         price: '49',
        //         heat: '10.3万人评价',
        //         reviewDesc: '特别好的电脑！硬盘，office2016增强版已安装...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/zmiyddy.jpg',
        //         title: 'ZMI移动电源10000mAh',
        //         price: '99',
        //         heat: '4392人评价',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/yddy10000.jpg',
        //         title: '小米移动电源10000mAh高配版',
        //         price: '149',
        //         heat: '8205人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmyddy.jpg',
        //         title: '20000mAh小米移动电源2',
        //         price: '149',
        //         heat: '1.6万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmyddy2h.jpg',
        //         title: '10000mAh小米移动电源2',
        //         price: '79',
        //         heat: '4.5万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmcxb.jpg',
        //         title: '小米插线板 5孔位',
        //         price: '39',
        //         heat: '2.7万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/usbctz.jpg',
        //         title: 'USB Type-C充电套装',
        //         price: '15',
        //         heat: '1人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xmzncxb.jpg',
        //         title: '小米智能插线板',
        //         price: '69',
        //         heat: '电源',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     card: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/yylycc.jpg',
        //         title: 'ROIDMI音乐蓝牙车充',
        //         price: '99',
        //         heat: '1880人评价',
        //         reviewDesc: '电饭煲很精巧，外观高大上，煮饭香又香。客服妹子，我叫...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmcdq.jpg',
        //         title: '小米USB充电器（2口）',
        //         price: '49',
        //         heat: '8869人评价',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/ch5.jpg',
        //         title: '彩虹5号电池（10粒装）',
        //         price: '9.9',
        //         heat: '10.3万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/1f2.jpg',
        //         title: '睿米一分二点烟器',
        //         price: '79',
        //         heat: '432人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmcdc.jpg',
        //         title: '小米USB充电器（4口）',
        //         price: '69',
        //         heat: '1.3万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/32gcck.png',
        //         title: 'SanDisk 32GB存储卡',
        //         price: '89',
        //         oldPrice: '98',
        //         discountType: 'discount',
        //         discount: '享9.1折',
        //         heat: '910人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmczcdq.jpg',
        //         title: '小米车载充电器',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '4.9万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/16gcck.png',
        //         title: 'SanDisk 16GB存储卡',
        //         price: '44.9',
        //         heat: '电池存储卡',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ]
        //   },
        //   {
        //     hotGoods: [
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/hm4xtm.jpg', title: '红米4X 标准高透贴膜',
        //         price: '9.9', oldPrice: '19', discountType: 'discount', discount: '享6折', heat: '4035人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: true},
        //       {link: 'https://item.mi.com/buy/mitv4a-43', imgUrl: './static/imgs/hmn4xtm.jpg', title: '红米Note4X 3GB+16GB/32GB，4GB+64GB（蓝色）标准高透贴膜',
        //         price: '9.9', oldPrice: '19', discountType: 'discount', discount: '享6折', heat: '9039人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/xmzjzpg.jpg', title: '小米支架式自拍杆',
        //         price: '79', oldPrice: '89', discountType: 'discount', discount: '享9折', heat: '2549人评价',reviewDesc: '是买给老婆的生日礼物！我们一家在我的带领下差不多都是...', reviewAuthor: '纷飞泪', reviewStatus: true},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/xmzhzj.jpg', title: '小米指环支架',
        //         price: '19',heat: '1.5万人评价',reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...', reviewAuthor: '在路上', reviewStatus: true},
        //       {link: 'https://www.mi.com/electric-toothbrush/', imgUrl: './static/imgs/xmzpg.jpg', title: '小米自拍杆（线控版）',
        //         price: '39', oldPrice: '49', discountType: 'discount', discount: '享8折', heat: '1.2万人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://www.mi.com/dianfanbao/', imgUrl: './static/imgs/mjssfs.jpg', title: '米家随身风扇',
        //         price: '19.9', heat: '1.9万人评价',reviewDesc: '中国人终于可以不要到国外去买电饭煲了！坐在家里点点手...', reviewAuthor: '姚士祥', reviewStatus: true},
        //       {link: 'https://www.mi.com/yeelight-ceilinglamp/', imgUrl: './static/imgs/hm4xbfk.jpg', title: '红米4X 天鹅绒质感保护壳',
        //         price: '29', heat: '1729人评价',reviewDesc: '可以改变色温，光暗，有一键夜灯，功能强大。本来不懂磁...', reviewAuthor: '冼伟强', reviewStatus: true},
        //       { link: 'https://www.mi.com/roomrobot/', imgUrl: './static/imgs/xm5sptm.jpg', title: '小米5s Plus 标准高透贴膜',
        //         price: '9.9', heat: '热门',reviewDesc: '', moreUrl: 'https://www.mi.com/buytv/',reviewAuthor: '冼伟强', reviewStatus: false}
        //     ],
        //     cover: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xm6bht.jpg',
        //         title: '小米6 硅胶保护套',
        //         price: '49',
        //         discountType: 'new',
        //         discount: '新品',
        //         heat: '2763人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/hm4xgtbht.jpg',
        //         title: '红米Note 4X 高透软胶保护套 透明',
        //         price: '19',
        //         heat: '4541人评价',
        //         reviewDesc: '超大的，就是厚了一点。运费安装费有点贵。',
        //         reviewAuthor: '假の太逼真',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmn2bht.jpg',
        //         title: '小米Note  2 高透软胶保护套',
        //         price: '9.9',
        //         oldPrice: '19',
        //         discountType: 'discount',
        //         discount: '享6折',
        //         heat: '2377人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xm5spbht.jpg',
        //         title: '小米5s Plus 智能翻盖保护套',
        //         price: '29',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享6折',
        //         heat: '3369人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xm5sbht.jpg',
        //         title: '小米5s 智能立显点阵式保护套',
        //         price: '49',
        //         oldPrice: '79',
        //         discountType: 'discount',
        //         discount: '享7折',
        //         heat: '3777人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmmaxbht.jpg',
        //         title: '小米Max 超薄肤感软胶保护套',
        //         price: '29',
        //         heat: '1.2万人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/hm4gbhk.jpg',
        //         title: '红米4高配版 超薄肤感软胶保护套',
        //         price: '9.9',
        //         oldPrice: '19',
        //         discountType: 'discount',
        //         discount: '享6折',
        //         heat: '1880人评价',
        //         reviewDesc: '小目标又实现一小步，大目标是两年内把客服MM都买到我...',
        //         reviewAuthor: '我本疯狂',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/hmn4bht.jpg',
        //         title: '红米Note4 智能显示保护套',
        //         price: '39',
        //         heat: '保护套',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     pasting: [
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/hm4xtm.jpg',
        //         title: '红米4X 标准高透贴膜',
        //         price: '9.9',
        //         oldPrice: '19',
        //         discountType: 'discount',
        //         discount: '享6折',
        //         heat: '4035人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmpb2tm.jpg',
        //         title: '小米平板2 标准高透贴膜',
        //         price: '29',
        //         heat: '1815人评价',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xm5tm.jpg',
        //         title: '小米手机5 钢化玻璃贴膜',
        //         price: '29',
        //         heat: '4.8万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xm5spgttm.jpg',
        //         title: '小米5s Plus 标准高透贴膜',
        //         price: '9.9',
        //         oldPrice: '19',
        //         discountType: 'discount',
        //         discount: '享6折',
        //         heat: '6268人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xm5spgttm.jpg',
        //         title: '小米5s 标准高透贴膜',
        //         price: '19',
        //         heat: '7080人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/hm4gtm.jpg',
        //         title: '红米4高配版 标准高透贴膜',
        //         price: '9.9',
        //         oldPrice: '19',
        //         discountType: 'discount',
        //         discount: '享6折',
        //         heat: '3204人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmmaxtm.jpg',
        //         title: '小米Max 标准高透贴膜',
        //         price: '19',
        //         heat: '1.3万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/hmptm.jpg',
        //         title: '红米Pro 标准高透贴膜',
        //         price: '9.9',
        //         heat: '贴膜',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     others: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/ymjxjp.png',
        //         title: '悦米机械键盘',
        //         price: '299',
        //         heat: '558人评价',
        //         reviewDesc: '电饭煲很精巧，外观高大上，煮饭香又香。客服妹子，我叫...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmzhzj.jpg',
        //         title: '小米指环支架',
        //         price: '19',
        //         heat: '1.5万人评价',
        //         reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...',
        //         reviewAuthor: '在路上',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmdyspq.jpg',
        //         title: '小米USB-C电源适配器（45W）',
        //         price: '99',
        //         heat: '492人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/lytgykq.jpg',
        //         title: '蓝牙语音体感遥控器',
        //         price: '99',
        //         heat: '3667人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmbxsbi.jpg',
        //         title: '小米便携鼠标',
        //         price: '99',
        //         heat: '8901人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/usbczjq.jpg',
        //         title: 'USB-C至HDMI多功能转接器',
        //         price: '149',
        //         heat: '1505人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/usbczjt.jpg',
        //         title: 'USB Type-C 转接头',
        //         price: '5',
        //         heat: '6.8万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xm2h1.jpg',
        //         title: '小米二合一数据线100cm',
        //         price: '24.9',
        //         heat: '其他配件',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ]
        //   },
        //   {
        //     hotGoods: [
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/mjydxzn.jpg', title: '米家运动鞋(智能版) 男款',
        //         price: '229', oldPrice: '249', discountType: 'discount', discount: '享9.2折', heat: '1.2万人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: true},
        //       {link: 'https://item.mi.com/buy/mitv4a-43', imgUrl: './static/imgs/zshyj.jpg', title: '最生活浴巾·青春系列',
        //         price: '79', oldPrice: '99', discountType: 'free', discount: '免邮费', heat: '1730人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/8hrjcd.jpg', title: '8H乳胶床垫',
        //         price: '999', heat: '335人评价',reviewDesc: '是买给老婆的生日礼物！我们一家在我的带领下差不多都是...', reviewAuthor: '纷飞泪', reviewStatus: true},
        //       {link: 'https://item.mi.com/1170900022.html', imgUrl: './static/imgs/90flxx.jpg', title: '90分旅行箱 20寸',
        //         price: '269', oldPrice: '299', discountType: 'free', discount: '免邮费', heat: '2.2万人评价',reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...', reviewAuthor: '在路上', reviewStatus: true},
        //       {link: 'https://www.mi.com/electric-toothbrush/', imgUrl: './static/imgs/90f24lxx.jpg', title: '90分旅行箱 24寸',
        //         price: '319', oldPrice: '349', discountType: 'free', discount: '免邮费', heat: '2.1万人评价',reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...', reviewAuthor: '贤妻良母', reviewStatus: false},
        //       {link: 'https://www.mi.com/dianfanbao/', imgUrl: './static/imgs/hjrjz.jpg', title: '8H护颈乳胶枕',
        //         price: '199', oldPrice: '239', discountType: 'discount', discount: '享9折', heat: '1.1万人评价',reviewDesc: '中国人终于可以不要到国外去买电饭煲了！坐在家里点点手...', reviewAuthor: '姚士祥', reviewStatus: true},
        //       {link: 'https://www.mi.com/yeelight-ceilinglamp/', imgUrl: './static/imgs/xmjjsjb.jpg', title: '小米极简都市双肩包',
        //         price: '129', oldPrice: '149', discountType: 'discount', discount: '享9折', heat: '2.4万人评价',reviewDesc: '可以改变色温，光暗，有一键夜灯，功能强大。本来不懂磁...', reviewAuthor: '冼伟强', reviewStatus: true},
        //       { link: 'https://www.mi.com/roomrobot/', imgUrl: './static/imgs/xmzjsszpg.jpg', title: '小米支架式自拍杆',
        //         price: '79', heat: '热门',reviewDesc: '', moreUrl: 'https://www.mi.com/buytv/',reviewAuthor: '冼伟强', reviewStatus: false}
        //     ],
        //     dress: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmtxpkn.png',
        //         title: '小米短袖T恤 扑克脸',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '864人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmtxcxys.png',
        //         title: '小米短袖T恤 程序艺术',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '836人评价',
        //         reviewDesc: '超大的，就是厚了一点。运费安装费有点贵。',
        //         reviewAuthor: '假の太逼真',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmtxcdr.png',
        //         title: '小米短袖T恤 吃豆人',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '774人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmgndx.jpg',
        //         title: '小米功能短袖Polo衫 男款',
        //         price: '99',
        //         heat: '1657人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmtxn.png',
        //         title: '小米短袖T恤 米兔昆仑游 女款',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '411人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmtxnk.png',
        //         title: '小米V领短袖T恤 男款',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '3494人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmtxkjys.png',
        //         title: '小米短袖T恤 科技艺术',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '781人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xmdxtxn.png',
        //         title: '小米短袖T恤 米兔昆仑游 男款',
        //         price: '39',
        //         heat: '服装',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     rabbit: [
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/mtbz.jpg',
        //         title: '60cm柔软米兔抱枕',
        //         price: '99',
        //         oldPrice: '129',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '1122人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mtgs.jpg',
        //         title: '13cm皮质米兔挂饰',
        //         price: '49',
        //         heat: '354人评价',
        //         reviewDesc: '真的很美！大小完全符合我的标准，厚度轻度都很好！外观...',
        //         reviewAuthor: '刘洋',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mthjz.jpg',
        //         title: '米兔多功能护颈枕',
        //         price: '49',
        //         heat: '3303人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mt.jpg',
        //         title: '经典款米兔（25cm）',
        //         price: '49',
        //         discountType: 'new',
        //         discount: '新品',
        //         heat: '154人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmtxpkn.png',
        //         title: '小米短袖T恤 扑克脸',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '864人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmtxcxys.png',
        //         title: '小米短袖T恤 程序艺术',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '836人评价',
        //         reviewDesc: '超大的，就是厚了一点。运费安装费有点贵。',
        //         reviewAuthor: '假の太逼真',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/xmtxcdr.png',
        //         title: '小米短袖T恤 吃豆人',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '774人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xmtxnk.png',
        //         title: '小米V领短袖T恤 男款',
        //         price: '39',
        //         heat: '米兔',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     around: [
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjzxbbx.jpg',
        //         title: '米家中性笔专用笔芯',
        //         price: '6.9',
        //         heat: '1.1万人评价',
        //         reviewDesc: '电饭煲很精巧，外观高大上，煮饭香又香。客服妹子，我叫...',
        //         reviewAuthor: '陈武',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/hhccjcy.jpg',
        //         title: '花花草草监测仪',
        //         price: '49',
        //         heat: '6517人评价',
        //         reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...',
        //         reviewAuthor: '在路上',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjssd.jpg',
        //         title: '米家LED随身灯 增强版',
        //         price: '19.9',
        //         heat: '3.6万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/mjssffs.jpg',
        //         title: '米家随身风扇',
        //         price: '99',
        //         heat: '1.9万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/bxjg.jpg',
        //         title: '变形金刚特别版声波',
        //         price: '159',
        //         oldPrice: '169',
        //         discountType: 'discount',
        //         discount: '享9.5折',
        //         heat: '2742人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/jssbd.jpg',
        //         title: '金属鼠标垫 小号',
        //         price: '49',
        //         heat: '1.2万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmsnh.jpg',
        //         title: '小米电源线收纳盒',
        //         price: '39',
        //         oldPrice: '49',
        //         discountType: 'discount',
        //         discount: '享8折',
        //         heat: '3669人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/sbdd.jpg',
        //         title: '鼠标垫加大号',
        //         price: '19',
        //         heat: '生活周边',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ],
        //     bags: [
        //       {
        //         link: 'https://item.mi.com/1170900022.html',
        //         imgUrl: './static/imgs/90flxx.jpg',
        //         title: '90分旅行箱 20寸',
        //         price: '269',
        //         oldPrice: '299',
        //         discountType: 'free',
        //         discount: '免邮费',
        //         heat: '2.2万人评价',
        //         reviewDesc: '忠实米粉，买了小米手机，配了米粉卡，买了小米电视，又...',
        //         reviewAuthor: '在路上',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/electric-toothbrush/',
        //         imgUrl: './static/imgs/90f24lxx.jpg',
        //         title: '90分旅行箱 24寸',
        //         price: '319',
        //         oldPrice: '349',
        //         discountType: 'free',
        //         discount: '免邮费',
        //         heat: '2.1万人评价',
        //         reviewDesc: '外形大方，超大气，安装师傅细心，打完眼还给打扫干净。...',
        //         reviewAuthor: '贤妻良母',
        //         reviewStatus: false
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/hwlv.jpg',
        //         title: '90分轻户外旅行洗漱包',
        //         price: '35',
        //         oldPrice: '39',
        //         discountType: 'discount',
        //         discount: '享9折',
        //         heat: '3553人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmnpqb.jpg',
        //         title: '小米简约头层小牛皮钱包',
        //         price: '89',
        //         oldPrice: '129',
        //         discountType: 'discount',
        //         discount: '享7折',
        //         heat: '3419人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmswsj.jpg',
        //         title: '小米经典商务双肩包',
        //         price: '89',
        //         oldPrice: '99',
        //         discountType: 'discount',
        //         discount: '享9折',
        //         heat: '1.1万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmdssj.jpg',
        //         title: '小米极简都市双肩包',
        //         price: '129',
        //         oldPrice: '149',
        //         discountType: 'discount',
        //         discount: '享9折',
        //         heat: '2.4万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'http://www.mi.com/mitv3s/55/',
        //         imgUrl: './static/imgs/xmxx.jpg',
        //         title: '小米多功能都市休闲胸包',
        //         price: '59',
        //         oldPrice: '69',
        //         discountType: 'discount',
        //         discount: '享9折',
        //         heat: '2.9万人评价',
        //         reviewDesc: '什么都有了就差客服妹子来暖床了，妹子你什么时间来啊',
        //         reviewAuthor: '小红哥哥',
        //         reviewStatus: true
        //       },
        //       {
        //         link: 'https://www.mi.com/roomrobot/',
        //         imgUrl: './static/imgs/xmxysj.jpg',
        //         title: '小米学院休闲双肩包',
        //         price: '69',
        //         heat: '箱包',
        //         reviewDesc: '',
        //         moreUrl: 'https://www.mi.com/buytv/',
        //         reviewAuthor: '冼伟强',
        //         reviewStatus: false
        //       }
        //     ]
        //   }
        // ],
        topTitleList: [],
        subsList: [],
        leftGoodsList: [],
        rightGoodsList: [],
        topSubStatus: 'hotGoods',
        currGoods: [],
      }
    },
    mounted () {
      this.IndexGoodsQry();
    },
    methods: {
      IndexGoodsQry() {
        var _self = this;
        IndexGoodsQryAction().then(res => {
          const data = res.data.data;
          _self.topTitleList = res.data.data.topTitleList;
          _self.subsList = res.data.data.subsList;
          _self.leftGoodsList = res.data.data.leftGoodsList;
          _self.rightGoodsList = res.data.data.rightGoodsList;
          for(let index = 0, len = _self.rightGoodsList.length ; index < len; index++) {
            _self.currGoods.push(_self.rightGoodsList[index][_self.topSubStatus]);
          }
        });
      },
      topSubEnter (index, key) {
        this.topSubStatus = key
        this.currGoods[index] = this.rightGoodsList[index][key]
      }
    },
    components: {
      'goods-top': GoodsTop,
      'goods-left': GoodsLeft,
      'goods-right': GoodsRight
    }
  }
</script>

<style scoped lang="scss">
  .around-container {
    width: 1226px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 8px;

    > .goods-top {
      width: 100%;
      height: 58px;

      .top-title {
        float: left;
        margin: 0;
        font-size: 22px;
        font-weight: 200;
        line-height: 58px;
        color: #333;
      }

      .top-sub {
        float: right;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        margin-top: 16px;
        color: #424242;

        li {
          width: auto;
          height: 24px;
          line-height: 24px;
          margin-left: 30px;
          cursor: pointer;
          border-bottom: 2px solid #f5f5f5;

          &.active {
            color: #ff6700;
            border-bottom: 2px solid #ff6700;
          }
        }
      }
    }
  }

  .goods-content {
    width: 1226px;
    height: auto;
    margin: 0 auto;
  }
</style>
