import { useState } from 'react';
import Card from './Card'

const TabedCard = props => {
    const [selectedTab, changeTab] = useState(props.active)

    const selected = props.list.find(l=>l.slug === selectedTab)

    return(
        <>
            <div className="tabedCard">
                <div className="tabNav">
                    <span>{props.intro}</span>
                    {
                        props.list.map(l => {
                            return(
                                <>
                                    <span value={l.slug} className={selectedTab === l.slug ? 'btn active' : 'btn' } onClick={e=>{changeTab(l.slug)}}>
                                        <div>
                                            <div className="iconTab">
                                                {l.icono}
                                            </div>
                                            <div className="name">
                                                {l.name}
                                            </div>
                                        </div>
                                    </span>
                                </>
                            )
                        }, this)
                    }
                </div>
                <Card class={props.class}>
                    {selected.component}
                </Card>
            </div>
        </>
    )
}

export default TabedCard