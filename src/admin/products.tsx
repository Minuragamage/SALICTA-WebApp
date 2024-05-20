import React, { useState, useEffect } from "react";
import { Button, Modal, Form, FormFeedback, Input, UncontrolledTooltip, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { Product } from "../models/Products";
import { toast } from "react-toastify";
import { AdminService } from "../services/AdminService";
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { CUSTOMERS, PRODUCTS, CONTACTUS } from "../dbUtils";
import Swal from "sweetalert2";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB34ETDWoWzo5ZynOQND2f_6OCsCdChEkk",
    authDomain: "salicta-c56ad.firebaseapp.com",
    projectId: "salicta-c56ad",
    storageBucket: "salicta-c56ad.appspot.com",
    messagingSenderId: "341279407350",
    appId: "1:341279407350:web:a011b845e766c3d9af00d7"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const generateItemCode = (): string => {
    const randomNumbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Random three-digit number
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter (A-Z)
    return `${randomLetter}${randomNumbers}`;
};


const AddProducts: React.FC = () => {
    const [modal_center, setModalCenter] = React.useState(false);
    const [itemCode, setItemCode] = useState<string>(generateItemCode());
    const [imageFiles, setImageFiles] = useState<FileList | null>(null);
    const [product, setProduct] = useState<Product>({} as Product);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);
    const colorOptions = [
        { value: '#FF0000', label: 'Red' },
        { value: '#00FF00', label: 'Green' },
        { value: '#0000FF', label: 'Blue' },
        { value: '#FFFF00', label: 'Yellow' },
        { value: '#FF00FF', label: 'Magenta' },
        { value: '#00FFFF', label: 'Cyan' },
        { value: '#000000', label: 'Black' },
        { value: '#FFFFFF', label: 'White' },
        // Add more color options as needed
    ];
    function togCenterReview() {
        setModalCenter(!modal_center);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(e.target.files);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'Products'));
            const fetchedProducts: Product[] = [];
            for (const doc of querySnapshot.docs) {
                const productData = doc.data();
                const images: string[] = [];
                for (const imageUrl of productData.images) {
                    const downloadUrl = await getDownloadURL(ref(storage, imageUrl));
                    images.push(downloadUrl);
                }
                fetchedProducts.push({ id: doc.id, ...productData, images });
            }
            setLoading(false);
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };




    const addProduct = async () => {
        if (!product?.category) {
            Swal.fire({
                icon: "error",
                title: "Product category required",
                confirmButtonColor: "#FD7F00",
            });
        } else if (!product?.description) {
            Swal.fire({
                icon: "error",
                title: "Product description required",
                confirmButtonColor: "#FD7F00",
            });

        } else if (!product?.price) {
            Swal.fire({
                icon: "error",
                title: "Product price required",
                confirmButtonColor: "#FD7F00",
            });

        } else if (!product?.title) {
            Swal.fire({
                icon: "error",
                title: "Product title required",
                confirmButtonColor: "#FD7F00",
            });

        } else if (!imageFiles) {
            Swal.fire({
                icon: "error",
                title: "Images required",
                confirmButtonColor: "#FD7F00",
            });

        } else {
            const imageUrls: string[] = [];
            if (imageFiles) {
                for (let i = 0; i < imageFiles.length; i++) {
                    const file = imageFiles[i];
                    const storageRef = ref(storage, `products/${file.name}`);
                    await uploadBytes(storageRef, file);
                    const imageUrl = await getDownloadURL(storageRef);
                    imageUrls.push(imageUrl);
                }
            }
            const updatedProduct: Product = {
                category: product?.category,
                description: product?.description,
                itemCode: itemCode,
                price: product?.price,
                rating: 0,
                stock: product?.stock,
                title: product?.title,
                images: imageUrls
            }

            AdminService.addProduct(updatedProduct).then(res => {
                setModalCenter(false);
                fetchProducts();
            });
        }
    }

    const deleteProduct = async (itemCode: any) => {
        console.log("itemCode", itemCode)
        try {
            await deleteDoc(doc(db, PRODUCTS, itemCode));
            fetchProducts(); // Refresh product list after deletion
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };

    const openEditModal = (product: Product) => {
        setEditedProduct(product);
        setEditModalOpen(true);
    };

    const updateProduct = async (updatedProductId: any) => {
        const updatedProduct: any = {
            description: editedProduct?.description,
            price: editedProduct?.price,
            rating: 0,
            stock: editedProduct?.stock,
            title: editedProduct?.title,
        }
        try {
            await updateDoc(doc(db, PRODUCTS, updatedProductId), updatedProduct);
            setEditModalOpen(false);
            fetchProducts(); // Refresh product list after update
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };


    return (
        <React.Fragment>
            <div className="content-wrapper ">
                <main>
                    <div className="container">
                        <div className="row row--30">
                            <div className="col-lg-12">
                                <div className="course-sidebar-3 sidebar-top-position">
                                    <Row>
                                        <Col xl={12}>
                                            <Button
                                                onClick={() => {
                                                    togCenterReview();
                                                }}
                                                className="btn btn-primary relative mb-3 mt-10"
                                                style={{
                                                    bottom: "0",
                                                    float: "right",
                                                }}
                                            >
                                                Create Product
                                            </Button>
                                        </Col>
                                    </Row>
                                    <div className="edu-course-widget widget-course-summery ">
                                        <h2 className="acc mb-4 pl-2 mt-5">Products</h2>

                                        {products !== undefined && products.length > 0 ? (
                                            <>

                                                <div className="table-responsive">
                                                    <table className="table cart-table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="product-subtotal">Category</th>
                                                                <th scope="col" className="product-subtotal">Title</th>
                                                                <th scope="col" className="product-title">Item Code</th>
                                                                <th scope="col" className="product-subtotal">Description</th>
                                                                <th scope="col" className="product-subtotal">Price</th>
                                                                <th scope="col" className="product-subtotal">Stock</th>
                                                                <th scope="col" className="product-subtotal">Images</th>
                                                                <th scope="col" className="product-subtotal">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {products.map(product => (
                                                                <tr key={product.itemCode}>
                                                                    <td>{product.title}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.itemCode}</td>
                                                                    <td>{product.description}</td>
                                                                    <td>Rs.{product.price}</td>
                                                                    <td>{product.stock}</td>
                                                                    <td>
                                                                        {/* {product.images && product.images.map((imageUrl, index) => ( */}
                                                                        <img src={product?.images[0]} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                                        {/* ))} */}
                                                                    </td>
                                                                    <td>
                                                                        <div className="flex">
                                                                            <button type="button"
                                                                                className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
                                                                            <button type="button"
                                                                                className="edit-button" onClick={() => openEditModal(product)}>Edit</button>
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </>
                                        ) : (
                                            loading ? (
                                                <div className="loading-text">Loading...</div>
                                            ) : (
                                                <div>No Products Available</div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Modal isOpen={modal_center}
                                toggle={() => {
                                    togCenterReview();
                                }} centered >
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setModalCenter(false);
                                        }}
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h4 className="title mb-30 mt-10">Add Products:</h4>
                                    <div>
                                        <form className="form-contact">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <select className="form-control f-14" onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                                                        <option selected>Select Category...</option>
                                                        <option value="sofa">Sofa</option>
                                                        <option value="table">Table</option>
                                                        <option value="chair">Chair</option>
                                                        <option value="bed">Bed</option>
                                                        <option value="lightning">Lightning</option>
                                                        <option value="decore">Decore</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input className="form-control" name="title" id="title" type="text"
                                                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                                        placeholder="Enter title" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input type="file" id="images" name="images" multiple onChange={handleImageChange} />
                                                </div>
                                            </div>

                                            {/* <div className="col-12">
                                                <label>Color:</label>
                                                <div>
                                                    {colorOptions.map(colorOption => (
                                                        <div
                                                            key={colorOption.value}
                                                            style={{
                                                                backgroundColor: colorOption.value,
                                                                width: '30px',
                                                                height: '30px',
                                                                borderRadius: '50%',
                                                                display: 'inline-block',
                                                                margin: '5px',
                                                                cursor: 'pointer',
                                                                border: (product.color && product.color.includes(colorOption.label)) ? '2px solid #333' : 'none'
                                                            }}
                                                            onClick={() => handleColorChange(colorOption.label)}
                                                        />
                                                    ))}
                                                </div>
                                            </div> */}

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input className="form-control valid" name="description" id="description" type="text"
                                                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                                        placeholder="Enter description" />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input className="form-control valid" name="itemCode" id="itemCode" type="text" value={itemCode} disabled
                                                        onChange={(e) => setProduct({ ...product, itemCode: e.target.value })}
                                                        placeholder="itemCode" />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input className="form-control" name="price" id="price" type="number"
                                                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                                                        placeholder="Enter price" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input className="form-control" name="stock" id="stock" type="number"
                                                        onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                                                        placeholder="Enter stock" />
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <Row>
                                        <Col xl={12}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    addProduct();
                                                }}
                                                className="btn colorchangeLog leadMargin edu-btn float-right btn-medium mb-20"
                                            >
                                                <div>Submit</div>
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </Modal>

                            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditModalOpen(false);
                                        }}
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h4 className="title mb-30 mt-10">Update Product:</h4>
                                    <div>
                                        <form className="form-contact">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label >Title</label>
                                                    <input className="form-control" name="title" id="title" type="text"
                                                        defaultValue={editedProduct?.title || ""}
                                                        onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                                                        placeholder="Enter title" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label >Description</label>
                                                    <input className="form-control valid" name="description" id="description" type="text"
                                                        defaultValue={editedProduct?.description || ""}
                                                        onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                                                        placeholder="Enter description" />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label >Price</label>
                                                    <input className="form-control" name="price" id="price" type="number"
                                                        defaultValue={editedProduct?.price || ""}
                                                        onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                                                        placeholder="Enter price" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label >Stock</label>
                                                    <input className="form-control" name="stock" id="stock" type="number"
                                                        defaultValue={editedProduct?.stock || ""}
                                                        onChange={(e) => setEditedProduct({ ...editedProduct, stock: parseInt(e.target.value) })}
                                                        placeholder="Enter stock" />
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <Row>
                                        <Col xl={12}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    updateProduct(editedProduct?.id);
                                                }}
                                                className="btn colorchangeLog leadMargin edu-btn float-right btn-medium mb-20"
                                            >
                                                <div>Update</div>
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </main >
            </div >

        </React.Fragment >
    );
};

export default AddProducts;

