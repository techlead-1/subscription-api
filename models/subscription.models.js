import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 2,
        maxLength: 255,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['EUR', 'USD', 'GBP'],
        default: 'USD',
        required: [true, 'Subscription currency is required'],
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: [true, 'Subscription category is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Subscription payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: date => date < new Date(),
            message: 'Subscription start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        required: [true, 'Subscription renewal date is required'],
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: 'Renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Subscription user is required'],
        index: true,
    }
}, { timestamps: true });

// auto calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }


        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }

//     auto update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next()
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;