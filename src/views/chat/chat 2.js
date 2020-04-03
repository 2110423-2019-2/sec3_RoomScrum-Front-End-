import React from 'react';
import { Navbar } from 'src/components/common'; //อย่าลืมเปลี่ยนเป็น user ด้วยนะจ๊ะ
import "./chat.css";


const Chat = () => {
  return (
    <div className="chat">
      <Navbar/> 
      <div className="container row fh">
            <div className="col-sm-5 border-right cl">
                <div className="container row fh">
                    <div className="col-sm-4">
                    <div><img src="/dsae.png"/></div>
                    </div>
                    <div className="col-sm-8">
                        name
                    </div>
                </div>
            </div>
            <div className="col-sm-7">
                CHAT
            </div>
        </div>
    </div>
  );
}

export default Chat;