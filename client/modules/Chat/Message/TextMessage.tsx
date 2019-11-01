import React, { useRef, useState } from 'react';

import Style from './Message.less';
import expressions from '../../../../utils/expressions';
import { transparentImage } from '../../../../utils/const';

interface TextMessageProps {
    content: string;
    time: string;
}

function TextMessage(props: TextMessageProps) {
    // eslint-disable-next-line react/destructuring-assignment
    const content = props.content
        .replace(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
            (r) => `<a class="${Style.selecteAble}" href="${r}" rel="noopener noreferrer" target="_blank">${r}</a>`,
        )
        .replace(/#\(([\u4e00-\u9fa5a-z]+)\)/g, (r, e) => {
            const index = expressions.default.indexOf(e);
            if (index !== -1) {
                return `<img class="${Style.baidu} ${Style.selecteAble}" src="${transparentImage}" style="background-position: left ${-30
                * index}px;" onerror="this.style.display='none'" alt="${r}">`;
            }
            return r;
        });
    let isNeedHide = (Date.now() - new Date(props.time).getTime()) > 60000;

    const [forceShow, setForceShow] = useState(false);

    const show = () => {
        setForceShow(!forceShow);
    }

    return (
        <div
            className={`${Style.textMessage} ${!forceShow && isNeedHide ? Style.hide : ''}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={show}
        />
    );
}

export default TextMessage;
