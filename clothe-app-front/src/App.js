import './App.css';
import Home from '../src/component/homepage/home'
import Product from '../src/component/homepage/product'
import ProductDetail from '../src/component/homepage/prodcutDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {Fragment } from 'react';
import PublicRoute from '../src/common/PublicRoute';
import Layout from './component/commentLayout/layout';

import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Fragment>
            <div>
              <div className='content'>
                <Routes>

                  {/* <Route element={<PublicRoute />}> */}
                  <Route element = {<Layout/>}>
                    <Route path='/' element={<Home/>} />
                    <Route path='/product' element={<Product/>} />
                    <Route path='/product-detail/:productCode' element={<ProductDetail/>} />

                  </Route>

                  {/* <Route element={<PrivateRoute currUserInfo={currUserInfo} setCurrUserInfo={setCurrUserInfo} />}>
                    <Route path='/' element={<HomePage currUserInfo={currUserInfo} />} />
                    <Route path='/personal/:id/*' element={<PersonalPage currUserInfo={currUserInfo} />}></Route>
                    <Route path='/account/setting' element={<SettingPage currUserInfo={currUserInfo} setCurrUserInfo={setCurrUserInfo}/>}> </Route>
                    <Route path='/search/' element={<FindFriend />}> </Route>
                    <Route path='/chat' element={<ChatPage currUserInfo={currUserInfo} />}> </Route>
                  </Route> */}

                  {/* <Route path='*' element={<ErrorPage />} /> */}
                </Routes>
              </div>
            </div>
          </Fragment>
        </BrowserRouter>
    </div>
  );
}

export default App;
