import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable as Table } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { ProductService } from '../../../demo/service/ProductService';
import { Demo } from '../../interfaces';

const DataTable = ({
    data,
    ignoredColumns = [],
    actionIdentifier = null,
    actions = null,
    title = null,
    subtitle = null,
    addNewItemButtonText = null,
    addNewItemCallback = null,
    scopedSlots = null,
    filtration = null,
    pagination = null,
}) => {
    let emptyProduct: Demo.Product = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK',
    };

    // const [products, setProducts] = useState<Demo.Product[]>([]);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState<Demo.Product>(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<Table<Demo.Product[]>>(null);
    const [columns, setColumns] = useState([]);

    let productList;
    let columnHeads = [];

    const columnHeader = useCallback(() => {
        if (!_.isUndefined(data) && !_.isNull(data) && _.size(data) > 0) {
            const keys = _.keys(_.omit(data[0], ignoredColumns));

            columnHeads = _.map(keys, (key) => ({
                key,
                label: _.upperCase(key),
            }));
            if (!_.isNull(actions) && _.size(actions) > 0) {
                columnHeads.push({
                    key: 'actions',
                    label: 'ACTIONS',
                });
            }
        }
        if (columns.length < 1) {
            setColumns([...columns, ...columnHeads]);
        }
    }, [data]);

    // useEffect(() => {
    //     productList = fetch('/demo/data/data.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => setdata(d.data));

    //     setProduct(data);
    // }, []);

    useEffect(() => {
        columnHeader();
    }, [columnHeader]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _data = [...data];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _data[index] = _product;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000,
                });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _data.push(_product);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000,
                });
            }

            setProducts(_data);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product: Demo.Product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product: Demo.Product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _data = data.filter((val) => val.id !== product.id);
        setProducts(_data);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _data = data.filter((val) => !selectedProducts?.includes(val));
        setProducts(_data);
        setDeleteProductsDialog(false);
        setSelectedProducts([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;
        hideDeleteProductsDialog;
        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        severity="danger"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedProducts || !selectedProducts.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload
                    mode="basic"
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Import"
                    className="mr-2 inline-block"
                />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    // const nameBodyTemplate = (rowData: Demo.Product) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Name</span>
    //             {rowData.name}
    //         </>
    //     );
    // };

    // console.log(nameBodyTemplate);

    // const imageBodyTemplate = (rowData: Demo.Product) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Image</span>
    //             <img
    //                 src={`/demo/images/product/${rowData.image}`}
    //                 alt={rowData.image}
    //                 className="shadow-2"
    //                 width="100"
    //             />
    //         </>
    //     );
    // };

    // const statusBodyTemplate = (rowData: Demo.Product) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Status</span>
    //             <span className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>
    //                 {rowData.inventoryStatus}
    //             </span>
    //         </>
    //     );
    // };

    // const actionBodyTemplate = (rowData: Demo.Product) => {
    //     return (
    //         <>
    //             <Button
    //                 icon="pi pi-pencil"
    //                 rounded
    //                 severity="success"
    //                 className="mr-2"
    //                 onClick={() => editProduct(rowData)}
    //             />
    //             <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)} />
    //         </>
    //     );
    // };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <Table
                        ref={dt}
                        value={data}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value as Demo.Product[])}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        {columns?.map((item: any, index: any) => {
                            return (
                                <Column
                                    key={item.key}
                                    field={item.key}
                                    header={item.label}
                                    sortable
                                    // body={(rowData: Demo.Product) => {
                                    //     return (
                                    //         <>
                                    //             <span className="p-column-title">{item.label}</span>
                                    //             {rowData[item.key]}
                                    //         </>
                                    //     );
                                    // }}
                                    headerStyle={{ minWidth: '10rem' }}
                                ></Column>
                            );
                        })}
                    </Table>

                    <Dialog
                        visible={productDialog}
                        style={{ width: '450px' }}
                        header="Product Details"
                        modal
                        className="p-fluid"
                        footer={productDialogFooter}
                        onHide={hideDialog}
                    >
                        {product?.image && (
                            <img
                                src={`/demo/images/product/${product.image}`}
                                alt={product.image}
                                width="150"
                                className="mt-0 mx-auto mb-5 block shadow-2"
                            />
                        )}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={product?.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({ 'p-invalid': submitted && !product.name })}
                            />
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea
                                id="description"
                                value={product?.description}
                                onChange={(e) => onInputChange(e, 'description')}
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category1"
                                        name="category"
                                        value="Accessories"
                                        onChange={onCategoryChange}
                                        checked={product?.category === 'Accessories'}
                                    />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category2"
                                        name="category"
                                        value="Clothing"
                                        onChange={onCategoryChange}
                                        checked={product?.category === 'Clothing'}
                                    />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category3"
                                        name="category"
                                        value="Electronics"
                                        onChange={onCategoryChange}
                                        checked={product?.category === 'Electronics'}
                                    />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category4"
                                        name="category"
                                        value="Fitness"
                                        onChange={onCategoryChange}
                                        checked={product?.category === 'Fitness'}
                                    />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber
                                    id="price"
                                    value={product?.price}
                                    onValueChange={(e) => onInputNumberChange(e, 'price')}
                                    mode="currency"
                                    currency="USD"
                                    locale="en-US"
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber
                                    id="quantity"
                                    value={product?.quantity}
                                    onValueChange={(e) => onInputNumberChange(e, 'quantity')}
                                />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteProductDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteProductDialogFooter}
                        onHide={hideDeleteProductDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteProductsDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteProductsDialogFooter}
                        onHide={hideDeleteProductsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
