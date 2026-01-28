import { useState } from 'react';
import { FiCheck, FiX, FiStar, FiMonitor, FiSmartphone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Subscription = () => {
  const { user, updateSubscription } = useAuth();
  const [loading, setLoading] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$8.99',
      period: 'month',
      icon: FiSmartphone,
      color: 'gray',
      features: [
        'Watch on 1 device at a time',
        'HD quality (720p)',
        'Access to basic content library',
        'Mobile and tablet streaming',
        'Cancel anytime'
      ],
      limitations: [
        'No 4K Ultra HD',
        'Limited simultaneous streams',
        'No premium content'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$13.99',
      period: 'month',
      icon: FiMonitor,
      color: 'blue',
      popular: true,
      features: [
        'Watch on 2 devices at the same time',
        'Full HD quality (1080p)',
        'Access to full content library',
        'All devices supported',
        'Download for offline viewing',
        'Cancel anytime'
      ],
      limitations: [
        'No 4K Ultra HD'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$17.99',
      period: 'month',
      icon: FiStar,
      color: 'yellow',
      features: [
        'Watch on 4 devices at the same time',
        '4K Ultra HD + HDR quality',
        'Access to all content including exclusives',
        'All devices supported',
        'Download for offline viewing',
        'Premium customer support',
        'Early access to new releases',
        'Cancel anytime'
      ],
      limitations: []
    }
  ];

  const handleSubscribe = async (planId) => {
    setLoading(planId);
    
    const result = await updateSubscription(planId);
    if (result.success) {
      // Show success message or redirect
    }
    
    setLoading(null);
  };

  const getColorClasses = (color, isActive = false) => {
    const colors = {
      gray: {
        bg: isActive ? 'bg-gray-600' : 'bg-gray-800',
        border: isActive ? 'border-gray-500' : 'border-gray-700',
        button: 'bg-gray-600 hover:bg-gray-700',
        text: 'text-gray-400',
        icon: 'text-gray-400'
      },
      blue: {
        bg: isActive ? 'bg-blue-600/20' : 'bg-gray-800',
        border: isActive ? 'border-blue-500' : 'border-gray-700',
        button: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-400',
        icon: 'text-blue-400'
      },
      yellow: {
        bg: isActive ? 'bg-yellow-600/20' : 'bg-gray-800',
        border: isActive ? 'border-yellow-500' : 'border-gray-700',
        button: 'bg-yellow-600 hover:bg-yellow-700',
        text: 'text-yellow-400',
        icon: 'text-yellow-400'
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enjoy unlimited access to movies and series. Cancel anytime.
          </p>
        </motion.div>

        {/* Current Plan */}
        {user?.subscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Current Plan</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">
                  {user.subscription.plan?.charAt(0).toUpperCase() + user.subscription.plan?.slice(1)} Plan
                </p>
                <p className="text-gray-400 text-sm">
                  Status: <span className={user.subscription.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                    {user.subscription.status?.toUpperCase()}
                  </span>
                </p>
                {user.subscription.expiryDate && (
                  <p className="text-gray-400 text-sm">
                    Expires: {new Date(user.subscription.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isCurrentPlan = user?.subscription?.plan === plan.id;
            const colors = getColorClasses(plan.color, isCurrentPlan);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`relative rounded-lg border-2 p-8 ${colors.bg} ${colors.border} ${
                  plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${colors.icon}`} />
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <FiCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-start space-x-3">
                      <FiX className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id || isCurrentPlan}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isCurrentPlan
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : colors.button + ' text-white'
                  }`}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : isCurrentPlan ? (
                    'Current Plan'
                  ) : (
                    `Choose ${plan.name}`
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Can I change my plan anytime?
              </h3>
              <p className="text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will take effect immediately.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-400">
                New users get a 7-day free trial with full access to all features. Cancel anytime during the trial.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-400">
                We accept all major credit cards, PayPal, and digital wallets for your convenience.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-400">
                Absolutely! You can cancel your subscription at any time with no cancellation fees.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;