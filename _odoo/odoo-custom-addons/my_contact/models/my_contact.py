from odoo import fields, models, api

class MyContact(models.Model):
    #Ingerit from Res Partner
    _inherit = 'res.partner'

    # Add wage field
    wage = fields.Integer()