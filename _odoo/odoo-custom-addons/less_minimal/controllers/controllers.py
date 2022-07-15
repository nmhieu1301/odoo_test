# -*- coding: utf-8 -*-
# from odoo import http


# class LessMinimal(http.Controller):
#     @http.route('/less_minimal/less_minimal/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/less_minimal/less_minimal/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('less_minimal.listing', {
#             'root': '/less_minimal/less_minimal',
#             'objects': http.request.env['less_minimal.less_minimal'].search([]),
#         })

#     @http.route('/less_minimal/less_minimal/objects/<model("less_minimal.less_minimal"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('less_minimal.object', {
#             'object': obj
#         })
