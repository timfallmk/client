// @flow
import * as React from 'react'
import {Avatar, Box, ClickableBox, Text, Icon, Usernames, Meta} from '../../../common-adapters'
import {globalMargins, globalStyles, globalColors, isMobile} from '../../../styles'
import {roleIconColorMap} from '../../role-picker/index.meta'
import {typeToLabel} from '../../../constants/teams'
import {type TypeMap} from '../../../constants/types/teams'

export type Props = {
  active: boolean,
  following: boolean,
  fullName: string,
  onClick: () => void,
  type: ?string,
  username: string,
  you: ?string,
}

const showCrown: TypeMap = {
  admin: true,
  owner: true,
  reader: false,
  writer: false,
}

export const TeamMemberRow = (props: Props) => {
  const {active, following, fullName, onClick, type, username, you} = props
  return (
    <ClickableBox
      style={{
        ...globalStyles.flexBoxRow,
        alignItems: 'center',
        flexShrink: 0,
        height: isMobile ? 56 : 48,
        padding: globalMargins.tiny,
        width: '100%',
      }}
      onClick={active ? onClick : undefined}
    >
      <Avatar username={username} size={isMobile ? 48 : 32} />
      <Box style={{...globalStyles.flexBoxColumn, marginLeft: globalMargins.small}}>
        <Box style={globalStyles.flexBoxRow}>
          <Usernames
            type="BodySemibold"
            colorFollowing={true}
            users={[{username, following, you: you === username}]}
          />
          {!active && (
            <Meta
              title="LOCKED OUT"
              style={{background: globalColors.red, marginLeft: globalMargins.xtiny, marginTop: 4}}
            />
          )}
        </Box>
        <Box style={globalStyles.flexBoxRow}>
          {!!fullName &&
            active && (
              <Text style={{marginRight: globalMargins.xtiny}} type="BodySmall">
                {fullName} •
              </Text>
            )}
          {type &&
            !!showCrown[type] && (
              <Icon
                // $FlowIssue "some string with unknown value"
                type={'iconfont-crown-' + type}
                style={{
                  color: roleIconColorMap[type],
                  fontSize: isMobile ? 16 : 12,
                  marginRight: globalMargins.xtiny,
                }}
              />
            )}
          <Text type="BodySmall">
            {active && type && typeToLabel[type]}{' '}
            {!active && 'Has reset their account; admin(s) can re-invite'}
          </Text>
        </Box>
      </Box>
    </ClickableBox>
  )
}
