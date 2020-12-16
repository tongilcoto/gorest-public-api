exports.resources = {
    CATEGORIES: 'categories',
    PRODUCTS: 'products',
    PRODUCT_CATEGORIES: 'product-categories',
    USERS: 'users'
};

exports.authmethods = {
    ANONYMOUS: 'anonymous',
    AUTHENTICATED: 'authenticated'
};

exports.responseStatuses = {
    ASYNCHRONOUS_OK: 201,
    AUTHENTICATION_KO: 401,
    SYNCHRONOUS_OK: 200
};

exports.errorMessages = {
    AUTHENTICATION_KO: 'Authentication failed'
};

exports.ordinals = {
    FIRST: 'first',
    INTERMEDIATE: 'intermediate',
    LAST: 'last'
};

exports.baseURL = 'https://gorest.co.in/public-api';

const regexpDoubleString = /^[a-z]{8} [a-z]{8}$/
const regexpText = /^[a-z ]{80}$/
const regexpEmail = /^[a-z0-9._+-]{1,20}@[a-z0-9]{3,15}\.[a-z]{2,4}$/
const regexpUrl = /^https:\/\/loremflickr.com\/250\/[\d]{3}$/
const regexpInteger = /^[\d]{3}$/
const regexpGender = /^(Male|Female)$/
const regexpUserStatus = /^(Active|Inactive)$/

exports.fieldTypes = {
    BOOLEAN: 'boolean',
    EVAL: 'eval',
    REGEXP: 'regexp'
};

exports.productsResponseFields = {
    mandatory: [
        "id",
        "name",
        "description", 
        "image", 
        "price", 
        "status"
    ],
    optional: ["discount_amount", "categories"]
};

exports.productsRequestFields = {
    mandatory: {
        name: {type: 'regexp', value: regexpDoubleString},
        description: {type: 'regexp', value: regexpText},
        image: {type: 'regexp', value: regexpUrl},
        price: {type: 'regexp', value: regexpInteger},
        status: {type: 'boolean'}
    },
    optional: {
        discount_amount: {type: 'eval', value: '(parseInt(data.price) * 0.10).toString()'}
    }
};

exports.productCategoriesResponseFields = {
    mandatory: [
        "id",
        "product_id",
        "category_id" 
    ]
};

exports.productCategoriesRequestFields = {
    mandatory: {
        product_id: {type: 'eval', value: 'global.productId'},
        category_id: {type: 'eval', value: 'global.categoryId'}
    }
};

exports.usersResponseFields = {
    mandatory: [
        "id",
        "name",
        "email", 
        "gender", 
        "status",
        "created_at",
        "updated_at"
    ]
};

exports.usersRequestFields = {
    mandatory: {
        name: {type: 'regexp', value: regexpDoubleString},
        email: {type: 'regexp', value: regexpEmail},
        gender: {type: 'regexp', value: regexpGender},
        status: {type: 'regexp', value: regexpUserStatus}
    }
};

exports.postsResponseFields = {
    mandatory: [
        "id",
        "user_id",
        "title", 
        "body", 
        "created_at",
        "updated_at"
    ]
};

exports.commentsResponseFields = {
    mandatory: [
        "id",
        "post_id",
        "name",
        "email",
        "body", 
        "created_at",
        "updated_at"
    ]
};

exports.todosResponseFields = {
    mandatory: [
        "id",
        "user_id",
        "title", 
        "completed",
        "created_at",
        "updated_at"
    ]
};

exports.formsForResouce = {
    "products": this.productsRequestFields,
    "product-categories":  this.productCategoriesRequestFields,
    "users": this.usersRequestFields
}

exports.numberFieldsAsStrings = {
    products: ["price", "discount_amount"],
    users: []
}

exports.stepWording = {
    ALL: 'all',
    COMPLETE: 'complete',
    MANDATORY: 'mandatory',
    OPTIONAL: 'optional',
    RANDOM: 'random'
};