//index.js
//获取应用实例
const app = getApp()

const API_BASE = 'https://yfblog.cn/wp-json'

const API_ROUTE = 'wp/v2/posts'

Page({
    data: {
        entities: [],
        embed: true,
        total: 0,
        totalPages: 0,
        currentPage: 1,
        isLoading: true,
        isEarth: false
    },
    //事件处理函数

    onLoad() {
        wx.request({
            url: `${ API_BASE }/${ API_ROUTE }?_embed=${ this.data.embed }`,
            success: (response) => {
                response.data.map(item => {
                    item.excerpt['plaintext']= item.excerpt.rendered.replace(/<[^>]+>/g,"")
                    return item;
                })
                const entities = response.data
                this.setData({
                    entities,
                    isLoading: false,
                    total: response.header['x-wp-total'],
                    totalPages: response.header['x-wp-totalpages'],
                    currentPage: 1,
                    isEarth: false
                })
            }
        })
    },
    onPullDownRefresh() {
        wx.request({
            url: `${ API_BASE }/${ API_ROUTE }?_embed=${ this.data.embed }`,
            success: (response) => {
                response.data.map(item => {
                    item.excerpt['plaintext']= item.excerpt.rendered.replace(/<[^>]+>/g,"")
                    return item;
                })
                const entities = response.data
                this.setData({
                    entities,
                    isLoading: false,
                    total: response.header['x-wp-total'],
                    totalPages: response.header['x-wp-totalpages'],
                    currentPage: 1,
                    isEarth: false
                })
                wx.stopPullDownRefresh()
            }
        })
    },

    onReachBottom() {

        let {
            currentPage,
            totalPages
        } = this.data
        if (currentPage >= totalPages) {
            return
        }

        this.setData({
            isLoading: true
        })

        currentPage = currentPage + 1

        wx.request({
            url: `${ API_BASE }/${ API_ROUTE }?_embed=${ this.data.embed }&page=${currentPage}`,
            success: (response) => {
                response.data.map(item => {
                    item.excerpt['plaintext']= item.excerpt.rendered.replace(/<[^>]+>/g,"")
                    return item;
                })
                const entities = [...this.data.entities, ...response.data]
                this.setData({
                    entities,
                    currentPage,
                    isLoading: false,
                    total: response.header['x-wp-total'],
                    totalPages: response.header['x-wp-totalpages'],
                    isEarth: currentPage >= totalPages
                })
            }
        })



    }


})
