import React, { useState } from 'react';
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";

import { Drawer, Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';


const Navbar = () => {
  //login drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  //For logo
  const navigate = useNavigate
  const backtoHome = () => {
    navigate("/")
  }
  //For Search Query
  const [searchQuery,SetSearchQuery] = useState("")
  const handleSearch = () => {

  }
  const onClearSearch = () => {
    SetSearchQuery("")

  }

  return (
    <Wrapper>
      <div className="navbar px-3 py-2 flex justify-between h-[80px] w-[80%] mx-auto items-center text-slate-900">
        <div className="left cursor-pointer" onClick={backtoHome}>
          <svg className="_8pSp-" viewBox="0 0 559 825" height="49" width="34" fill="#fc8019"><path fill-rule="evenodd" clip-rule="evenodd" d="M542.92 388.542C546.805 366.526 542.355 349.598 530.881 340.76C513.621 327.466 487.698 320.236 425.954 320.236C380.271 320.236 331.225 320.286 310.268 320.275C308.322 319.894 301.285 317.604 301.02 309.112L300.734 174.289C300.727 165.779 307.531 158.857 315.943 158.839C324.369 158.825 331.204 165.723 331.211 174.226C331.211 174.226 331.421 247.414 331.441 273.424C331.441 275.936 332.892 281.8 338.549 283.328C375.43 293.267 561.865 285.999 558.967 251.804C543.147 109.96 424.476 0 280.394 0C235.021 0 192.065 10.9162 154.026 30.2754C62.9934 77.5955 -1.65904 173.107 0.0324268 283.43C1.23215 361.622 52.2203 500.605 83.434 521.234C97.8202 530.749 116.765 527.228 201.484 527.228C239.903 527.228 275.679 527.355 293.26 527.436C295.087 527.782 304.671 530.001 304.671 538.907L304.894 641.393C304.915 649.907 298.104 656.826 289.678 656.829C281.266 656.843 274.434 649.953 274.42 641.446C274.42 641.446 275.17 600.322 275.17 584.985C275.17 581.435 275.424 575.339 265.178 570.727C231.432 555.553 121.849 564.712 115.701 581.457C113.347 587.899 125.599 612.801 144.459 644.731C170.102 685.624 211.889 747.245 245.601 792.625C261.047 813.417 268.77 823.813 280.467 824.101C292.165 824.389 300.514 814.236 317.213 793.928C383.012 713.909 516.552 537.663 542.92 388.542Z" fill="url(#paint0_linear_19447_66107)"></path><defs><linearGradient id="paint0_linear_19447_66107" x1="445.629" y1="63.8626" x2="160.773" y2="537.598" gradientUnits="userSpaceOnUse"><stop stop-color="#FF993A"></stop><stop offset="1" stop-color="#F15700"></stop></linearGradient></defs></svg>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={({target}) => {
            SetSearchQuery(target.value)
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <div className="right">
         <button onClick={showDrawer}>
            <span className='flex items-center'><CgProfile className='mr-1' /><span>Login</span></span>
          </button>
        </div>
      </div>
      <Drawer
        width={600}
        onClose={onClose}
        open={open}
      >
        <div>
          {isLogin ? (
            <div className='login h-[680px] flex justify-center items-center w-[100%]'>
              <Form
                className='w-[70%] h-[60%] flex flex-col items-center border-2 border-solid border-orange-400 rounded-xl px-2 py-4'
                name="basic"
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                
                <svg className="_8pSp-" viewBox="0 0 559 825" height="49" width="34" fill="#fc8019"><path fill-rule="evenodd" clip-rule="evenodd" d="M542.92 388.542C546.805 366.526 542.355 349.598 530.881 340.76C513.621 327.466 487.698 320.236 425.954 320.236C380.271 320.236 331.225 320.286 310.268 320.275C308.322 319.894 301.285 317.604 301.02 309.112L300.734 174.289C300.727 165.779 307.531 158.857 315.943 158.839C324.369 158.825 331.204 165.723 331.211 174.226C331.211 174.226 331.421 247.414 331.441 273.424C331.441 275.936 332.892 281.8 338.549 283.328C375.43 293.267 561.865 285.999 558.967 251.804C543.147 109.96 424.476 0 280.394 0C235.021 0 192.065 10.9162 154.026 30.2754C62.9934 77.5955 -1.65904 173.107 0.0324268 283.43C1.23215 361.622 52.2203 500.605 83.434 521.234C97.8202 530.749 116.765 527.228 201.484 527.228C239.903 527.228 275.679 527.355 293.26 527.436C295.087 527.782 304.671 530.001 304.671 538.907L304.894 641.393C304.915 649.907 298.104 656.826 289.678 656.829C281.266 656.843 274.434 649.953 274.42 641.446C274.42 641.446 275.17 600.322 275.17 584.985C275.17 581.435 275.424 575.339 265.178 570.727C231.432 555.553 121.849 564.712 115.701 581.457C113.347 587.899 125.599 612.801 144.459 644.731C170.102 685.624 211.889 747.245 245.601 792.625C261.047 813.417 268.77 823.813 280.467 824.101C292.165 824.389 300.514 814.236 317.213 793.928C383.012 713.909 516.552 537.663 542.92 388.542Z" fill="url(#paint0_linear_19447_66107)"></path><defs><linearGradient id="paint0_linear_19447_66107" x1="445.629" y1="63.8626" x2="160.773" y2="537.598" gradientUnits="userSpaceOnUse"><stop stop-color="#FF993A"></stop><stop offset="1" stop-color="#F15700"></stop></linearGradient></defs></svg>
                <h1 className='text-3xl my-2 text-orange-600'>Login</h1>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Email is Required!',
                    },
                  ]}
                >
                  <Input placeholder="Enter your Email" name='email' autoComplete="new-email" className='w-[250px] mt-3 border-orange-400 ' />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Password is Required!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your Password" name='password' autoComplete="new-password" className='w-[250px] mt-3 border-orange-400' />
                </Form.Item>
                <span>Don't Have an Account please <button onClick={toggleAuth} className='text-blue-700'>register</button></span>
                <Form.Item
                >
                  <Button htmlType='submit' className='bg-orange-600 w-[250px] mt-3 rounded-none text-white'>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div className='login h-[680px] flex justify-center items-center w-[100%]'>
              <Form
                className='w-[70%] h-[70%] flex flex-col items-center border-2 border-solid border-orange-400 rounded-xl px-2 py-4'
                name="basic"
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                <svg className="_8pSp-" viewBox="0 0 559 825" height="49" width="34" fill="#fc8019"><path fill-rule="evenodd" clip-rule="evenodd" d="M542.92 388.542C546.805 366.526 542.355 349.598 530.881 340.76C513.621 327.466 487.698 320.236 425.954 320.236C380.271 320.236 331.225 320.286 310.268 320.275C308.322 319.894 301.285 317.604 301.02 309.112L300.734 174.289C300.727 165.779 307.531 158.857 315.943 158.839C324.369 158.825 331.204 165.723 331.211 174.226C331.211 174.226 331.421 247.414 331.441 273.424C331.441 275.936 332.892 281.8 338.549 283.328C375.43 293.267 561.865 285.999 558.967 251.804C543.147 109.96 424.476 0 280.394 0C235.021 0 192.065 10.9162 154.026 30.2754C62.9934 77.5955 -1.65904 173.107 0.0324268 283.43C1.23215 361.622 52.2203 500.605 83.434 521.234C97.8202 530.749 116.765 527.228 201.484 527.228C239.903 527.228 275.679 527.355 293.26 527.436C295.087 527.782 304.671 530.001 304.671 538.907L304.894 641.393C304.915 649.907 298.104 656.826 289.678 656.829C281.266 656.843 274.434 649.953 274.42 641.446C274.42 641.446 275.17 600.322 275.17 584.985C275.17 581.435 275.424 575.339 265.178 570.727C231.432 555.553 121.849 564.712 115.701 581.457C113.347 587.899 125.599 612.801 144.459 644.731C170.102 685.624 211.889 747.245 245.601 792.625C261.047 813.417 268.77 823.813 280.467 824.101C292.165 824.389 300.514 814.236 317.213 793.928C383.012 713.909 516.552 537.663 542.92 388.542Z" fill="url(#paint0_linear_19447_66107)"></path><defs><linearGradient id="paint0_linear_19447_66107" x1="445.629" y1="63.8626" x2="160.773" y2="537.598" gradientUnits="userSpaceOnUse"><stop stop-color="#FF993A"></stop><stop offset="1" stop-color="#F15700"></stop></linearGradient></defs></svg>
                <h1 className='text-3xl my-2 text-orange-600'>Register</h1>
                <Form.Item
                >
                  <Input placeholder="Enter your Name" name='username' autoComplete="new-name" className='w-[250px] mt-3 border-orange-400 ' />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Email is Required!',
                    },
                  ]}
                >
                  <Input placeholder="Enter your Email" name="email"  autoComplete="new-email" className='w-[250px] mt-3 border-orange-400 ' />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Password is Required!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your Password" name='password' autoComplete="new-password" className='w-[250px] mt-3 border-orange-400' />
                </Form.Item>
                <span>Have an Account please <button onClick={toggleAuth} className='text-blue-700'>login</button></span>
                <Form.Item
                >
                  <Button htmlType='submit' className='bg-orange-600 w-[250px] mt-3 rounded-none text-white'>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </Drawer>

    </Wrapper>
  )
}
const Wrapper = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 2px 8px grey;
    .login {
      border: 2px solid red;
      background-color: red;
    }
`;

export default Navbar
