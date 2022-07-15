# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class less_minimal(models.Model):
#     _name = 'less_minimal.less_minimal'
#     _description = 'less_minimal.less_minimal'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
from odoo import fields, models


class MinimalModel(models.Model):
    _name = 'test.models'

    name = fields.Char(required=True)
    