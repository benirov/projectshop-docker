import React from 'react';
import { Link } from 'react-router-dom'
import Layout from '../components/Layout';

const Dashboard = () => {
    return (
    <Layout>
        <div className="banner">
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
				</ol>
				<div className="carousel-inner" role="listbox">
					<div className="carousel-item item active">
						<div className="carousel-caption text-center">
							<h3>Your Style
                            <span>Want to Look Your Best?</span>
							</h3>
							<a href="/products" className="btn btn-sm animated-button gibson-three mt-4">Shop Now</a>
						</div>
					</div>
				</div>
			</div>
		</div>
        
    </Layout>
    );
}
 
export default Dashboard;