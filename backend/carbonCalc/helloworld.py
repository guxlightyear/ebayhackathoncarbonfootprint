from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import logging
import urllib2

class MainPage(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.out.write('Hello, weba  pp World!')

        id = self.request.get('id')
        lat = self.request.get('lat')
        lon = self.request.get('lon')
        logging.info(id)
        logging.info(lat)
        logging.info(lon)
        response = urllib2.urlopen(doItemQuery(id))
        itemLocation = getItemLocation(response.read())
        logging.info('Item is at ' + itemLocation)
        response = urllib2.urlopen(doDistQuery(lat, lon, itemLocation))
        distance = getDistance(response.read())
        logging.info('Distance is ' + distance)
        self.response.out.write(distance)


application = webapp.WSGIApplication(
                                     [('/calc', MainPage)],
                                     debug=True)

def main():
    run_wsgi_app(application)

def doDistQuery(lat, lon, itemLocation):
    #TODO build gmaps query
    return 'http://www.python.org'

def doItemQuery(id):
    # TODO build ebay query
    return 'http://www.python.org'

def getDistance(data):
    # TODO parse gmaps data to get distance
    return "aDistance"

def getItemLocation(data):
    # TODO parse data to get itemLocation
    return "aLocation"

if __name__ == "__main__":
    main()
