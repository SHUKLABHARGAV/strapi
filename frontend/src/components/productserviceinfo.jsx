import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import img1 from "./img/product 7.jpeg"
import "./serviceinfo.css"
import Breadcrumb from "../components/Breadcrumb"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import InquiryForm from './inquiryform';
const Productserviceinfo = () => {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [product, setProducts] = useState(null);
  useEffect(() => {
    // Fetch product details using the id
    // Replace with your actual fetch logic
    const fetchProduct = async () => {
      try {
        await fetch(`http://localhost:1337/api/services/${id}?populate=*`, {
          method: "GET"
        })
          .then((rsp) => rsp.json())
          .then((resp) => {
            console.log('API Response:', resp);

            setProducts(resp.data.attributes);



            // if (!Array.isArray(resp?.data)) {
            //   console.log('Data is not an array:', resp.data);
            //   return null;
            // }


            // const data  =  Array.isArray(resp?.data) && resp.data.map((item, index) => {
            //   const { attributes: { productTitle, productimg, productdesc } } = item;
            //   return { 
            //     description: productdesc, 
            //     title: productTitle,
            //     imageUrl: productimg?.data?.[0]?.attributes?.url ? `http://localhost:1337${productimg.data[0].attributes.url}` : 'wd' 
            //   };
            // });

            // setProducts(data);

            console.log('Modified Data:', resp);
          })

      }
      catch (error) {
        console.error('Error fetching products:', error);
      }

    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }



  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title="Our Service"
        page="Service" />
      {/* Breadcrumb */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="row gx-3 h-100">
                <div className=" align-self-start wow fadeInUp" data-wow-delay="0.1s">
                  <h1 className="display-5 mb-4">Product</h1>
                  <img className="img-fluid" alt='w' src={`http://localhost:1337${product.productimg.data[0].attributes.url}`} />
                </div>

              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 className="display-6 mb-4">  {product.productTitle}</h1>
              <div className="mb-4 mx-0">
                <div className="m-0" onClick={toggleAccordion}>
                  <p className="display-6 d-flex justify-content-between align-items-center">   Description  {isOpen ? <FaChevronUp /> : <FaChevronDown />}</p>
                </div>
                {isOpen && (
                  <div className="mb-4">
                    {product.Description && product.Description.filter(desc => desc.children[0].text.trim() !== '').map((desc, index) => (
                      <ul className='mb-4 ' style={{ textAlign: "justify" }} key={index}><li className='mb-4  d ' >{desc.children[0].text}</li></ul>
                    ))}
                  </div>
                )}
              </div>
              <p className="display-5 mb-4">Specification</p>
              <InquiryForm/>
              {/* <a className=" m-2 button " href="/inquiryform" ><span className='disable'>Enquire Now</span></a> */}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Productserviceinfo
