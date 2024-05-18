import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import aboutUsImg from "../../static/img/about/about-us.jpg"

function AboutUs() {
return (
    <>
    <section class="breadcrumb-option">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb__text">
                        <h4>Về chúng tôi</h4>
                        <div class="breadcrumb__links">
                            <span><Link to='/' >Trang chủ</Link></span>
                            <span>Về chúng tôi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="about spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="about__pic">
                        <img src={aboutUsImg} alt=""  style={{ width: "936px", height: "472px"}} />
                    </div>
                </div>
            </div>
            {/* <div class="row"> */}
                {/* <div class="col-lg-4 col-md-4 col-sm-6"> */}
                    <div class="about__item">
                    <h4 class="about__item__content">Chúng tôi là ai ?</h4>
                        <p>- Chúng tôi là <b>xưởng May Thịnh Khoa </b>- tự hào là đơn vị hàng đầu trong lĩnh vực sản xuất và cung cấp các sản phẩm may mặc chất lượng cao.</p>
                        <p>- Với đội ngũ nhân viên tay nghề cao và quy trình sản xuất hiện đại, chúng tôi cam kết mang đến những sản phẩm hoàn hảo và dịch vụ tận tâm nhất cho khách hàng.</p>
                    </div>
                {/* </div> */}
                {/* <div class="col-lg-4 col-md-4 col-sm-6"> */}

                    {/* <div class="about__item">
                    <h4 class="about__item__content">Who We Do ?</h4>
                        <p>In this digital generation where information can be easily obtained within seconds, business
                        cards still have retained their importance.</p>
                    </div> */}

                {/* </div> */}
                {/* <div class="col-lg-4 col-md-4 col-sm-6"> */}
                    <div class="about__item">
                        <h4 class="about__item__content">Vì sao nên chọn chúng tôi ?</h4>
                        <div class = "content_about_us">
                        <p>- Chất lượng vượt trội: luôn chú trọng đến chất lượng sản phẩm, từ khâu chọn nguyên liệu đến từng đường kim mũi chỉ, đảm bảo mỗi sản phẩm đều đạt tiêu chuẩn cao nhất.</p>

                        <p>-  Đội ngũ chuyên nghiệp: Chúng tôi với hơn 20 năm kinh nghiệm trong lĩnh vực may mặc, sẵn sàng đáp ứng mọi yêu cầu khắt khe của khách hàng.</p>

                        <p>-  Công nghệ hiện đại: Áp dụng các công nghệ và quy trình sản xuất tiên tiến, chúng tôi đảm bảo sự chính xác và hiệu quả trong từng sản phẩm.</p>

                        <p>- Giá cả cạnh tranh: Xưởng May Thịnh Khoa cung cấp sản phẩm với mức giá hợp lý, cạnh tranh trên thị trường, giúp khách hàng tiết kiệm chi phí mà vẫn nhận được sản phẩm chất lượng.</p>

                        <p>- Dịch vụ tận tâm: Chúng tôi cam kết mang đến dịch vụ khách hàng tốt nhất, từ khâu tư vấn, hỗ trợ thiết kế đến hậu mãi, luôn lắng nghe và đáp ứng mọi nhu cầu của khách hàng.</p>

                        <p>- Đa dạng sản phẩm: Với nhiều năm kinh nghiệm, chúng tôi cung cấp đa dạng các loại sản phẩm may mặc phù hợp với nhiều nhu cầu và phong cách khác nhau, đảm bảo khách hàng luôn tìm thấy những gì họ cần.</p>

                        <p>  Lựa chọn Xưởng May Thịnh Khoa, bạn sẽ hoàn toàn yên tâm về chất lượng và dịch vụ mà chúng tôi mang lại.</p>
                        </div>
                    </div>
                {/* </div> */}
            {/* </div> */}
        </div>
    </section>

    {/* <section class="testimonial">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6 p-0">
                    <div class="testimonial__text">
                        <span class="icon_quotations"></span>
                        <p>“Going out after work? Take your butane curling iron with you to the office, heat it up,
                            style your hair before you leave the office and you won’t have to make a trip back home.”
                        </p>
                        <div class="testimonial__author">
                            <div class="testimonial__author__pic">
                                <img src="img/about/testimonial-author.jpg" alt=""/>
                            </div>
                            <div class="testimonial__author__text">
                                <h5>Augusta Schultz</h5>
                                <p>Fashion Design</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 p-0">
                    <div class="testimonial__pic set-bg" data-setbg="img/about/testimonial-pic.jpg"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="counter spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="counter__item">
                        <div class="counter__item__number">
                            <h2 class="cn_num">102</h2>
                        </div>
                        <span>Our <br />Clients</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="counter__item">
                        <div class="counter__item__number">
                            <h2 class="cn_num">30</h2>
                        </div>
                        <span>Total <br />Categories</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="counter__item">
                        <div class="counter__item__number">
                            <h2 class="cn_num">102</h2>
                        </div>
                        <span>In <br />Country</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="counter__item">
                        <div class="counter__item__number">
                            <h2 class="cn_num">98</h2>
                            <strong>%</strong>
                        </div>
                        <span>Happy <br />Customer</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="team spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <span>Our Team</span>
                        <h2>Meet Our Team</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="team__item">
                        <img src="img/about/team-1.jpg" alt=""/>
                        <h4>John Smith</h4>
                        <span>Fashion Design</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="team__item">
                        <img src="img/about/team-2.jpg" alt=""/>
                        <h4>Christine Wise</h4>
                        <span>C.E.O</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="team__item">
                        <img src="img/about/team-3.jpg" alt=""/>
                        <h4>Sean Robbins</h4>
                        <span>Manager</span>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="team__item">
                        <img src="img/about/team-4.jpg" alt=""/>
                        <h4>Lucy Myers</h4>
                        <span>Delivery</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="clients spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <span>Partner</span>
                        <h2>Happy Clients</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-1.png" alt=""/></a>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-2.png" alt=""/></a>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-3.png" alt=""/></a>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-4.png" alt=""/></a>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-5.png" alt=""/></a>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-6.png" alt=""/></a>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-7.png" alt=""/></a>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-6">
                    <a href="#" class="client__item"><img src="img/clients/client-8.png" alt=""/></a>
                </div>
            </div>
        </div>
    </section>*/}
    </> 
)
}

export default AboutUs