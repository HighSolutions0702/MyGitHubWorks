/**
 * Created by cini priya devi_l on 9/30/14.
 */
app.directive('titleBox', function () {
    return{
        restrict: 'E',
        compile: function (element, attrs) {
            var formName = attrs.formname;

            var model = attrs.modelref;

            var allowedCharacters = attrs.allowedchars;

            var placeHolderValue = attrs.placeholder;

            var limit = attrs.limit;

            var requiredError = '<span ng-show="' + formName + '.titleBox.$error.required" class="alert-danger">Required</span>';

            var maxLengthError = attrs.hasOwnProperty('limit') ? '<span ng-show="' + formName + '.titleBox.$error.maxlength" class="alert-danger" id="errMaxlength">Title should be shorter than ' + limit + ' characters.</span>' : '';

            var validCharactersError = attrs.hasOwnProperty('allowedchars') ? '<span ng-show="' + formName + '.titleBox.$error.pattern" class="alert-danger">Title should not contain invalid characters.</span>' : '';

            var htmlText = '<div><input type="text" class="form-control input-sm" name="titleBox" id="titleBox" required ng-maxlength="' + limit + '"' + ' ng-model="' + model + '"';

            if (allowedCharacters) {
                htmlText += ' ng-pattern="' + allowedCharacters + '"';
            }

            if (placeHolderValue) {
                htmlText += ' placeholder="' + placeHolderValue + '"'
            }

            htmlText += ' >' + requiredError + maxLengthError + validCharactersError + '</div>';
            console.log("Created tag:" + htmlText);
            element.replaceWith(htmlText);
        }
    };
});
