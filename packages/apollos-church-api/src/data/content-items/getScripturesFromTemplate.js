const getScripturesFromTemplate = (contentChannelItemId) => `
{% capture references %}[{% contentchannelitem id:'${contentChannelItemId}' iterator:'ccis' %}
{% for cci in ccis %}
{% assign matrixGuid = cci | Attribute:'Scriptures','Object' | Property:'Guid' %}
{% attributematrix where:'Guid == "{{ matrixGuid }}"' iterator:'matrices' %}
    {% for matrix in matrices %}
        {% attributematrixitem where:'AttributeMatrixId == {{ matrix.Id }}' iterator:'items' %}
            {% for item in items %}{
                {% attributevalue where:'EntityId == {{ item.Id }} && ForeignKey == {{ item.ForeignId }}' iterator:'values' %}
                    {% for value in values %}
                        {% assign valueSize = value.Value | Size %}
                        {% if valueSize == 36 %}
                            {% definedvalue where:'Guid == "{{ value.Value }}"' iterator:'dvs' %}
                                {% for dv in dvs %}
                                    "book": "{{ dv.Value }}"
                                {% endfor %}
                            {% enddefinedvalue %}
                        {% else %}
                            "verse": "{{ value.Value }}"
                        {% endif %}{% if forloop.last != true %},{% endif %}
                    {% endfor %}
                {% endattributevalue %}
            }{% if forloop.last != true %},{% endif %}{% endfor %}
        {% endattributematrixitem %}
    {% endfor %}
{% endattributematrix %}
{% endfor %}
{% endcontentchannelitem %}]{% endcapture %}{{ references | Trim | StripNewlines }}
`;

export default getScripturesFromTemplate;
