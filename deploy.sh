#!/bin/bash
rm -rf dist && npm run build && scp -r dist/* root@tools.adfc-hamburg.de:/var/www/html/umleitung/u1-ohlsdorf/
