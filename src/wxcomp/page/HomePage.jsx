import React from "react";
import {MediaBox, MediaBoxBody, MediaBoxDescription, MediaBoxHeader, MediaBoxTitle, Tab, TabBar, TabBarItem,
    TabBody, Toast} from "react-weui";

class HomePage extends React.Component {
    constructor (props) {

        super(props);
        this.state = {
            "all": {
                "data": [],
                "page": 0
            },
            "ask": {
                "data": [],
                "page": 0
            },
            "share": {
                "data": [],
                "page": 0
            },
            "job": {
                "data": [],
                "page": 0
            },
            "good": {
                "data": [],
                "page": 0
            },
            "showLoading": true,
            "tab": "all"
        };

    }

    componentDidMount () {

        // 缓存数据
        let nodedata = sessionStorage.getItem("nodedata");

        if (nodedata) {

            nodedata = JSON.parse(nodedata);
            this.setState({
                "all": {
                    "data": nodedata.all,
                    "page": 1
                },
                "ask": {
                    "data": nodedata.ask,
                    "page": 1
                },
                "share": {
                    "data": nodedata.share,
                    "page": 1
                },
                "job": {
                    "data": nodedata.job,
                    "page": 1
                },
                "good": {
                    "data": nodedata.good,
                    "page": 1
                },
                "showLoading": false
            });

        } else {

            window.$.when(this.getAjax(), this.getAjax({"tab": "ask"}),
               this.getAjax({"tab": "share"}), this.getAjax({"tab": "job"}),
               this.getAjax({"tab": "good"})).done((all, ask, share, job, good) => {

                   const nodedata = {
                       "all": all[0].data,
                       "ask": ask[0].data,
                       "share": share[0].data,
                       "job": job[0].data,
                       "good": good[0].data
                   };

                   sessionStorage.setItem("nodedata", JSON.stringify(nodedata));

                   this.setState({
                       "all": {
                           "data": nodedata.all,
                           "page": 1
                       },
                       "ask": {
                           "data": nodedata.ask,
                           "page": 1
                       },
                       "share": {
                           "data": nodedata.share,
                           "page": 1
                       },
                       "job": {
                           "data": nodedata.job,
                           "page": 1
                       },
                       "good": {
                           "data": nodedata.good,
                           "page": 1
                       },
                       "showLoading": false
                   });

               });

        }

    }

    getAjax (data = {}) {

        if (data.tab == "all") {

            delete data.tab;

        }

        return window.$.ajax({
            "method": "get",
            "url": "https://cnodejs.org/api/v1/topics",
            data,
            "dataType": "json"
        });

    }

    getTabString (tab) {

        switch (tab) {
        case "job": {

            return "招聘";

        }
        case "share": {

            return "分享";
        }
        case "ask": {

            return "问答";
        }
        }

    }

    scrollHandel (event) {

        const dom = event.target;
        const scrollTop = dom.scrollTop;
        const clientHeight = dom.clientHeight;
        const scrollHeight = dom.scrollHeight;
        const sum = scrollTop + clientHeight;

        // 下拉加载
        if (sum >= scrollHeight) {

            this.setState({"showLoading": true});

            const currtab = this.state.tab;
            const currobj = this.state[currtab];

            this.getAjax({
                "tab": currtab,
                "page": currobj.page + 1
            }).done((json) => {

                this.setState({
                    "showLoading": false,
                    [currtab]: {
                        "data": currobj.data.concat(json.data),
                        "page": currobj.page + 1
                    }
                });

            });

        }

        // 上拉刷新
        if(scrollTop <= 0) {
            this.setState({"showLoading": true});

            const currtab = this.state.tab;
            const currobj = this.state[currtab];
            this.getAjax({
                "tab": currtab,
            }).done((json) => {
                let nodedata = JSON.parse(sessionStorage.getItem("nodedata"));
                nodedata[currtab] = json.data.concat(nodedata[currtab].slice(39));
                currobj.data = nodedata[currtab];
                this.setState({
                    "showLoading": false,
                    [currtab] : currobj
                })
            });
        }
    }

    getTopic (item) {

        if (item.top) {

            return <span className={"good"}>置顶</span>;

        } else if (item.good) {

            return <span className={"good"}>精华</span>;

        }

        return <span className={"default"}>{this.getTabString(item.tab)}</span>;


    }

    render () {

        return <div className={'page'}>
            <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
            <Tab>
                <TabBody style={{display: this.state.tab == 'all'? null: 'none'}} onScroll={this.scrollHandel.bind(this)}>
                {
                    this.state.all.data.map((item,key)=>{
                        return <MediaBox type="appmsg" href={'#/detail/'.concat(item.id,'?tab=',this.state.tab)} key={key}>
                            <MediaBoxHeader><img src={item.author.avatar_url} /></MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>{item.title}</MediaBoxTitle>
                                <MediaBoxDescription>
                                    {this.getTopic(item)}&nbsp;{item.reply_count}/{item.visit_count}
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    })
                }
                </TabBody>
                <TabBody style={{display: this.state.tab == 'ask'? null: 'none'}} onScroll={this.scrollHandel.bind(this)}>
                {
                    this.state.ask.data.map((item,key)=>{
                        return <MediaBox type="appmsg" href={'#/detail/'.concat(item.id,'?tab=',this.state.tab)} key={key}>
                            <MediaBoxHeader><img src={item.author.avatar_url} /></MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>{item.title}</MediaBoxTitle>
                                <MediaBoxDescription>
                                    {this.getTopic(item)}&nbsp;{item.reply_count}/{item.visit_count}
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    })
                }
                </TabBody>
                <TabBody style={{display: this.state.tab == 'share'? null: 'none'}} onScroll={this.scrollHandel.bind(this)}>
                {
                    this.state.share.data.map((item,key)=>{
                        return <MediaBox type="appmsg" href={'#/detail/'.concat(item.id,'?tab=',this.state.tab)} key={key}>
                            <MediaBoxHeader><img src={item.author.avatar_url} /></MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>{item.title}</MediaBoxTitle>
                                <MediaBoxDescription>
                                    {this.getTopic(item)}&nbsp;{item.reply_count}/{item.visit_count}
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    })
                }
                </TabBody>
                <TabBody style={{display: this.state.tab == 'job'? null: 'none'}} onScroll={this.scrollHandel.bind(this)}>
                {
                    this.state.job.data.map((item,key)=>{
                        return <MediaBox type="appmsg" href={'#/detail/'.concat(item.id,'?tab=',this.state.tab)} key={key}>
                            <MediaBoxHeader><img src={item.author.avatar_url} /></MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>{item.title}</MediaBoxTitle>
                                <MediaBoxDescription>
                                    {this.getTopic(item)}&nbsp;{item.reply_count}/{item.visit_count}
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    })
                }
                </TabBody>
                <TabBody style={{display: this.state.tab == 'good'? null: 'none'}} onScroll={this.scrollHandel.bind(this)}>
                {
                    this.state.good.data.map((item,key)=>{
                        return <MediaBox type="appmsg" href={'#/detail/'.concat(item.id,'?tab=',this.state.tab)} key={key}>
                            <MediaBoxHeader><img src={item.author.avatar_url} /></MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>{item.title}</MediaBoxTitle>
                                <MediaBoxDescription>
                                    {this.getTopic(item)}&nbsp;{item.reply_count}/{item.visit_count}
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    })
                }
                </TabBody>
                <TabBar>
                <TabBarItem icon={<img src="app/img/all.png"/>} label="全部" active={this.state.tab=='all'} onClick={()=>this.setState({tab: 'all'})}></TabBarItem>
                <TabBarItem icon={<img src="app/img/ask.png"/>} label="问答" active={this.state.tab=='ask'} onClick={()=>this.setState({tab: 'ask'})}></TabBarItem>
                <TabBarItem icon={<img src="app/img/share.png"/>} label="分享" active={this.state.tab=='share'} onClick={()=>this.setState({tab: 'share'})}></TabBarItem>
                <TabBarItem icon={<img src="app/img/job.png"/>} label="招聘" active={this.state.tab=='job'} onClick={()=>this.setState({tab: 'job'})}></TabBarItem>
                <TabBarItem icon={<img src="app/img/good.png"/>} label="精华" active={this.state.tab=='good'} onClick={()=>this.setState({tab: 'good'})}></TabBarItem>
                </TabBar>
            </Tab>
       </div>;

    }
}

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
