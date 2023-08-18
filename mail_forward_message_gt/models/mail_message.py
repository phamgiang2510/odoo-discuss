from odoo import fields, models


class MailMessage(models.Model):
    _inherit = 'mail.message'

    is_forward = fields.Boolean("Is Forward Message")
    src_message_id = fields.Many2one('mail.message', string="Source Message",
                                     help="The source message which this message is forwarded from.")
    src_author_id = fields.Many2one('res.partner', string="Source Author",
                                    help="The first author who wrote this message.")
    src_date = fields.Datetime("Source Date")

    def message_format(self, format_reply=True):
        vals_list = super(MailMessage, self).message_format(format_reply)
        for vals in vals_list:
            message = self.sudo().browse(vals['id'])
            if message.is_forward:
                vals.update({
                    'is_forward': True,
                    'src_author': message.src_author_id.display_name,
                    'src_date': message.src_date,
                })
        return vals_list
