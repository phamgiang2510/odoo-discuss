{
    'name': "Forward Messages in Discuss",
    'summary': "Forward messages to another channel or user",
    'sequence': 100,
    'description': """
    """,
    'author': "GT Apps",
    'support': 'phamgiang2510@gmail.com',
    'category': 'Productivity/Discuss',
    'version': '0.1',
    'depends': ['mail'],
    'data': [],
    'demo': [],
    'assets': {
        'mail.assets_discuss_public': [
            'mail_forward_message_gt/static/src/*/*/*',
        ],
        'web.assets_backend': [
            'mail_forward_message_gt/static/src/*/*/*.scss',
            'mail_forward_message_gt/static/src/*/*/*.js',
        ],
        'web.assets_qweb': [
            'mail_forward_message_gt/static/src/*/*/*.xml',
        ],
    },
    'images': ['static/description/banner.png'],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'OPL-1',
    'price': 19.9,
    'currency': 'USD',
}
